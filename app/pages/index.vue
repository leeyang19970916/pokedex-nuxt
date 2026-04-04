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
      <FilterWrapper @search="handleFilter" :searchForm="state.searchForm" />
      <SortWrapper v-model="state.sort" @search="handleSort" />
      <template v-if="!state.isLoading">
        <div v-if="state.list.length" class="grid grid-cols-4 gap-4">
          <PokemonCard
            v-for="poke in state.list"
            :key="`${poke.id}-${poke.name}`"
            :poke
          />
        </div>
        <div v-else class="m-[0_auto]">查無資料</div>
      </template>
      <div
        ref="loadMoreRef"
        class="w-full h-20 flex justify-center items-center mt-4"
      >
        <LoadingBallIcon v-show="state.isLoading" class="rotate-ball" />
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
import {
  useIntersectionObserver,
  useDebounceFn,
  useWindowScroll,
} from "@vueuse/core";

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
useIntersectionObserver(loadMoreRef, (entries) => {
  const isIntersecting = entries[0]?.isIntersecting;
  const hasMore = state.value.list.length < state.value.total;
  if (isIntersecting && hasMore && !state.value.isLoading) {
    next();
  }
});
const { y } = useWindowScroll();
const randomList = await useFetch("/api/pokemon/random", {
  query: {
    limit: 13,
  },
});

const DEFAULT_LIST_QUERY: PokeListQuery = {
  limit: 20,
  offset: 0,
  searchForm: DEFAULT_SEARCH_FORM,
  sort: POKEMON_SORT_OPTIONS[0].value,
};

const state = ref<State>({
  total: 0,
  list: [],
  limit: DEFAULT_LIST_QUERY.limit,
  offset: DEFAULT_LIST_QUERY.offset,
  isLoading: true,
  searchForm: DEFAULT_LIST_QUERY.searchForm,
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
  } else {
    try {
      const { list, total } = await $fetch("/api/pokemon/fetchList");
      state.value.total = total;
      state.value.list = list;
    } catch (e) {
      console.error(e, "err");
    }
  }
};

const next = () => {
  state.value.offset += state.value.limit;
  fetchUpdatedList(state.value, true);
};
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

onMounted(async () => {
  pokeStore.setAbilities();
  await fetchPokeList();
  // await nextTick()

  state.value.isLoading = false;
});
onBeforeUnmount(() => {
  const { searchForm, sort, limit, list, offset, total } = state.value;
  const caches: PokedexCache = {
    searchForm,
    sort,
    limit,
    offset,
    list,
    scrollY: y.value,
    total,
  };
  pokeStore.setPokedexCache(caches);
});
</script>
