<script setup lang="ts">
import { computed } from "vue";
import { useTodoStore } from "@/stores/todo";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import IconClose from "./icons/IconClose.vue";

const store = useTodoStore();
const router = useRouter();

const onClickItem = (todoId: string) => {
  store.setTodo(store.currentTodo);
  router.push(`/todo/${todoId}`);
};

const onAddItem = () => {
  store.addTodo();
  router.push(`/todo/${store.currentTodo.id}`);
};

const myList = computed({
  get() {
    return store.todos;
  },
  set(value) {
    store.setTodos(value);
  },
});
</script>

<template>
  <div class="sidebar">
    <h1
      class="flex items-center justify-between px-3 py-4 text-lg font-semibold"
    >
      Demo Todo List
      <IconClose
        class="w-6 h-6"
        role="button"
        @click="store.setIsMenuOpen(false)"
      />
    </h1>
    <div class="mb-6">
      <draggable v-model="myList" item-key="id">
        <template #item="{ element }">
          <div
            role="link"
            @click="() => onClickItem(element.id)"
            :class="[
              store.currentTodo.id === element.id && 'item-active',
              'block px-5 py-3 truncate bg-primary-300 cursor-pointer mb-2',
            ]"
          >
            {{ element.order }}. {{ element.title }}
          </div>
        </template>
      </draggable>
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
.sidebar {
  @apply h-screen bg-primary-200 w-[250px] z-30;
  @apply md:static md:translate-x-0;
}

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
