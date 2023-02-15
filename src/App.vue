<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import Sidebar from "@/components/SideBar.vue";
import MainContent from "@/components/MainContent.vue";
</script>

<template>
  <main class="h-screen flex">
    <Sidebar />
    <MainContent />
  </main>
</template>
