<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { watch, onMounted } from "vue";
import { useTodoStore } from "@/stores/todo";

import Sidebar from "@/components/SideBar.vue";

const store = useTodoStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  router.push(`/todo/${store.todos[0].id}`);
});

watch(
  () => route.params.id,
  (newId) => {
    store.setCurrentTodo(newId as string);
  }
);
</script>

<template>
  <main class="flex h-screen">
    <Sidebar />
    <RouterView />
  </main>
</template>
