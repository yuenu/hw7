import { createRouter, createWebHistory } from "vue-router";
import MainContent from "@/components/MainContent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainContent,
    },
    {
      path: "/todo/:id",
      name: "todo",
      component: MainContent,
    },
  ],
});

export default router;
