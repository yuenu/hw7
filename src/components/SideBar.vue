<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { useRoute, useRouter } from "vue-router";
const store = useTodoStore();
const route = useRoute();
const router = useRouter();

const onClickItem = (todoId: string) => {
  store.setTodo(store.currentTodo);
  router.push(`/todo/${todoId}`);
};

const onAddItem = () => {
  store.addTodo();
  router.push(`/todo/${store.currentTodo.id}`);
};
</script>

<template>
  <div class="h-screen bg-primary-200 w-[250px]">
    <h1 class="px-3 py-4 text-lg font-semibold">Demo Todo List</h1>
    <div class="mb-6 space-y-2">
      <div
        role="link"
        @click="() => onClickItem(item.id)"
        :class="[
          route.params.id === item.id && 'item-active',
          'block px-5 py-3 truncate bg-primary-300 cursor-pointer',
        ]"
        v-for="item in store.todos"
        :key="item.id"
      >
        {{ item.order }}. {{ item.title }}
      </div>
    </div>
    <button
      type="button"
      :disabled="store.todos.length >= 10"
      :class="[
        store.todos.length >= 10 && 'cursor-not-allowed',
        'w-[200px] py-2 mx-auto text-lg bg-primary-100 rounded-xl block',
      ]"
      @click="onAddItem"
    >
      Add Item
    </button>
  </div>
</template>

<style scoped lang="scss">
.item-active {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    border-bottom: 24px solid transparent;
    border-top: 24px solid transparent;
    border-right: 18px solid #fff;
  }
}
</style>
