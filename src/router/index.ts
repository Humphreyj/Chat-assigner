import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "../views/HomeScreen.vue";
import GroupPage from "../views/GroupPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeScreen,
    },
    {
      path: "/group/:groupNumber",
      name: "group",
      component: GroupPage,
      beforeEnter: (to) => {
        const num = Number(to.params.groupNumber);
        if (!Number.isInteger(num) || num < 1 || num > 15) {
          return { name: "home" };
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
