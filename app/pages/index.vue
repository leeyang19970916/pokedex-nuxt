<template>
  <div>
    <PokemonIndexHeader
      v-if="randomList.status.value === 'success' && randomList.data.value"
      :list="randomList.data.value"
    />

    <div
      class="px-[3%] pb-[10%] flex flex-col gap-6 min-h-[80vh]"
      :style="{ 'background-image': `url(${BottomBackground})` }"
    >
      <div ref="resultTopRef"></div>

      <transition name="fade" mode="out-in">
        <FilterWrapper
          v-if="isReadyCache"
          @search="handleFilter"
          :searchForm="state.searchForm"
        />
        <div
          v-else
          class="w-full p-6 rounded-xl bg-black/50 backdrop-blur-md border border-primary/50 shadow-[0_0_25px_rgba(179,234,254,0.15)] flex flex-col gap-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center gap-4 w-full animate-pulse"
          >
            <div
              class="flex-grow h-[42px] bg-primary/20 rounded-md w-full"
            ></div>

            <div
              class="w-full md:w-[100px] h-[42px] bg-primary/20 rounded-md"
            ></div>

            <div
              class="w-full md:w-[120px] h-[42px] bg-primary/10 border border-primary/30 rounded-md"
            ></div>
          </div>
        </div>
      </transition>

      <SortWrapper v-model="state.sort" @search="handleSort" />

      <div
        v-if="state.list.length"
        class="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <PokemonCard
          v-for="poke in state.list"
          :key="`${poke.id}-${poke.name}`"
          :poke
        />
      </div>
      <div
        v-if="!hasMore && !state.list.length"
        class="text-center text-primary mt-5"
      >
        查無資料
      </div>
      <div
        ref="loadMoreRef"
        class="w-full h-20 flex justify-center items-center mt-4"
      >
        <LoadingBallIcon v-show="hasMore" class="rotate-ball" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PokemonIndexHeader from "~/components/PokemonIndex/Header.vue";
import PokemonCard from "~/components/PokemonCard.vue";
import BottomBackground from "~/assets/image/header/list_bottom_bg.jpg";
import FilterWrapper from "~/components/FilterWrapper/index.vue";
import type {
  PokeListQuery,
  PokeCard,
  PokeSearchForm,
  QueryFormat,
  PokedexCache,
} from "~/types/pokemon";
import {
  POKEMON_SORT_OPTIONS,
  DEFAULT_SEARCH_FORM,
  SLIDER_RANGE,
} from "~/constants";
import { usePokeStore } from "~/store/pokeStore";
import { useIntersectionObserver, useDebounceFn } from "@vueuse/core";
import { deepClone } from "~~/utils/deepClone";

interface State {
  total: number;
  list: PokeCard[];
  limit: PokeListQuery["limit"];
  offset: PokeListQuery["offset"];
  isLoading: boolean;
  searchForm: PokeListQuery["searchForm"];
  sort: PokeListQuery["sort"];
}

const pokeStore = usePokeStore();
const loadMoreRef = shallowRef<HTMLElement | null>(null);
const resultTopRef = shallowRef<HTMLElement | null>(null);
const hasMore = computed(
  () => state.value.isLoading || state.value.list.length < state.value.total
);
useIntersectionObserver(
  loadMoreRef,
  (entries) => {
    const isIntersecting = entries[0]?.isIntersecting;
    if (isIntersecting && hasMore.value && !state.value.isLoading) {
      next();
    }
  },
  {
    rootMargin: "0px 0px 500px 0px",
  }
);
const randomList = await useFetch("/api/pokemon/random", {
  query: {
    limit: 13,
  },
});

const DEFAULT_LIST_QUERY: PokeListQuery = {
  limit: 20,
  offset: 0,
  searchForm: deepClone(DEFAULT_SEARCH_FORM),
  sort: POKEMON_SORT_OPTIONS[0].value,
};

const state = ref<State>({
  total: 0,
  list: [],
  limit: DEFAULT_LIST_QUERY.limit,
  offset: DEFAULT_LIST_QUERY.offset,
  isLoading: true,
  searchForm: deepClone(DEFAULT_LIST_QUERY.searchForm),
  sort: DEFAULT_LIST_QUERY.sort,
});
const fetchPokeList = async () => {
  if (pokeStore.pokedexCache) {
    const { limit, list, searchForm, sort, total, offset } =
      pokeStore.pokedexCache;
    state.value.limit = limit;
    state.value.list = list;
    state.value.offset = offset;
    state.value.searchForm = searchForm;
    state.value.sort = sort;
    state.value.total = total;
    if (state.value.list.length === 0) {
      await fetchUpdatedList(state.value);
      scrollToResult();
    } else {
      state.value.isLoading = false;
    }
  } else {
    await fetchUpdatedList(state.value);
  }
};
const isReadyCache = ref(false);

const next = useDebounceFn(() => {
  state.value.offset += state.value.limit;
  fetchUpdatedList(state.value, true);
}, 500);
const handleFilter = useDebounceFn((searchForm: PokeSearchForm) => {
  state.value.offset = DEFAULT_LIST_QUERY.offset;
  const query: PokeListQuery = {
    limit: DEFAULT_LIST_QUERY.limit,
    offset: state.value.offset,
    sort: state.value.sort,
    searchForm,
  };
  state.value.searchForm = searchForm;
  fetchUpdatedList(query);
  scrollToResult();
}, 300);
const handleSort = () => {
  const { sort, offset, searchForm } = state.value;
  const query: PokeListQuery = {
    limit: DEFAULT_LIST_QUERY.limit,
    offset,
    sort,
    searchForm,
  };
  fetchUpdatedList(query);
  scrollToResult();
};
const fetchUpdatedList = async (
  query: PokeListQuery,
  isAppend: boolean = false
) => {
  state.value.isLoading = true;

  const { limit, offset, searchForm, sort } = query;
  let queryFormat: QueryFormat = {
    limit,
    offset,
    sort,
    keywords: searchForm.keywords.trim() || undefined,
    types: searchForm.types || undefined,
    regions: searchForm.regions || undefined,
    ability: searchForm.ability === "all" ? undefined : searchForm.ability,
    ...getRange(searchForm.ids),
  };
  try {
    const { list, total } = await $fetch("/api/pokemon/fetchList", {
      query: queryFormat,
    });

    if (isAppend) {
      state.value.list.push(...list);
    } else {
      state.value.list = list;
    }
    state.value.total = total;
  } catch (error) {
    console.error(error, "fetchUpdatedList() is error");
  } finally {
    state.value.isLoading = false;
  }
};

const getRange = (ids: PokeSearchForm["ids"]) => {
  const [minId, maxId] = ids;
  if (minId === SLIDER_RANGE.min && maxId === SLIDER_RANGE.max) {
    return undefined;
  }
  return {
    minId,
    maxId,
  };
};
const scrollToResult = () => {
  nextTick(() => {
    if (resultTopRef.value) {
      resultTopRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
};

onMounted(async () => {
  pokeStore.setAbilities();
  await fetchPokeList();
  isReadyCache.value = true;
});
onBeforeRouteLeave((to) => {
  if (to.path.includes("/pokemon/")) {
    const { searchForm, sort, limit, list, offset, total } = state.value;
    const caches: PokedexCache = {
      searchForm,
      sort,
      limit,
      offset,
      list,
      total,
    };
    pokeStore.setPokedexCache(caches);
  } else {
    pokeStore.setPokedexCache(null);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
