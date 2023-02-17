<script setup lang="ts">
import SideBar from "./SideBar.vue";
import { useTodoStore } from "@/stores/todo";
const store = useTodoStore();
</script>

<template>
  <Teleport to="body">
    <div
      v-show="store.isMenuOpen"
      :class="[
        'md:hidden 12',
        'absolute top-0 left-0 w-screen h-screen bg-black/60',
      ]"
    >
      <SideBar />
    </div>
  </Teleport>
</template>
