import { SLIDER_RANGE } from "~/constants";
export default defineNuxtRouteMiddleware((to) => {
  const { max, min } = SLIDER_RANGE;
  const id = Number(to.params.id);
  if (isNaN(id) || id < min || id > max) {
    console.log(id, "id不符合預期，返回首頁");
    return navigateTo("/");
  }

  console.log("驗證通過,是存在的寶可夢ID", "to path", to.fullPath);
});
