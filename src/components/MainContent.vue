<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";
import { useTodoStore } from "@/stores/todo";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconMenu from "./icons/IconMenu.vue";
import { convertBase64 } from "@/utils";

const store = useTodoStore();
const route = useRoute();
const router = useRouter();
const { currentTodo } = storeToRefs(store);

const TEXTAREAR_MAX_LENGTH = 200;
const remainingCount = ref(0);

const onInputTitleChange = (evt: Event) => {
  store.onChangeTodo({
    proporty: "title",
    changeValue: (evt.target as HTMLInputElement).value,
  });
};

const onKeyUp = (evt: Event) => {
  store.onChangeTodo({
    proporty: "content",
    changeValue: (evt.target as HTMLInputElement).value,
  });
  remainingCount.value = store.currentTodo.content.length;
};

const imgPreview = ref<HTMLImageElement | null>(null);
const hasImage = ref(false);

watch(
  () => route.params.id,
  () => {
    imgPreview.value!.src = store.currentTodo.image;
    hasImage.value = !!store.currentTodo.image;
    remainingCount.value = store.currentTodo.content.length;
  }
);
const onFileChange = async (evt: Event) => {
  const element = evt.target as HTMLInputElement;
  if (!element || !imgPreview.value) return;
  const file = element.files![0];
  const base64 = (await convertBase64(file)) as string;
  store.onChangeTodo({
    proporty: "image",
    changeValue: base64,
  });
  imgPreview.value.src = base64;
  hasImage.value = true;
  element.value = "";
};

const onDeleteTodo = () => {
  const nextTodoId = store.deleteTodo(currentTodo.value.id);
  router.push(`/todo/${nextTodoId}`);
};

const today = new Date();
const startTimeLowerLimit = computed(() => {
  const yesterday = new Date(store.currentTodo.endTime);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
});
const endTimeLowerLimit = computed(() => {
  const nextDay = new Date(store.currentTodo.startTime);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
});
</script>

<template>
  <div class="flex-1 p-5 space-y-4">
    <div class="flex justify-between h-6">
      <IconMenu
        class="w-6 h-6 md:opacity-0 md:pointer-events-none"
        role="button"
        @click="store.setIsMenuOpen(true)"
      />
      <IconTrash
        v-show="store.currentTodo.order !== 1"
        @click="onDeleteTodo"
        role="button"
        class="w-6 h-6 ml-auto stroke-[#292D32] hover:stroke-red-600"
      />
    </div>
    <div>
      <input
        class="w-full p-4 item"
        type="text"
        placeholder="New item title"
        :value="currentTodo.title"
        @input="onInputTitleChange"
      />
    </div>
    <div
      class="flex flex-col items-center justify-between h-auto md:h-[30vh] gap-5 md:flex-row"
    >
      <div class="relative w-full h-40 md:w-3/5 md:h-full">
        <textarea
          :value="currentTodo.content"
          @keyup="onKeyUp"
          class="w-full h-full p-4 resize-none item"
          placeholder="Content..."
          :maxlength="TEXTAREAR_MAX_LENGTH"
        ></textarea>
        <span class="absolute text-sm pointer-events-none bottom-2 right-4"
          >{{ remainingCount }} / {{ TEXTAREAR_MAX_LENGTH }}</span
        >
      </div>
      <div
        :class="[
          'relative flex-1 w-full overflow-hidden min-h-[20rem] mt-16 max-h-[20rem]  item',
          'md:mt-0 md:h-full md:min-h-full',
        ]"
      >
        <img
          ref="imgPreview"
          :class="[
            hasImage && 'opacity-100',
            'object-cover w-full h-full opacity-0',
          ]"
        />
        <span
          :class="[
            hasImage && 'opacity-0',
            'absolute -translate-x-1/2 -translate-y-1/2 select-none left-1/2 top-1/2',
          ]"
        >
          Image Preview
        </span>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <div
        :class="[
          'flex items-center gap-5 absolute top-[19.5rem] left-0 w-full px-5',
          'md:static md:w-3/5 md:px-0',
        ]"
      >
        <Datepicker
          class="w-full h-12 text-center rounded-lg bg-gray-cool"
          v-model="store.currentTodo.startTime"
          :upper-limit="startTimeLowerLimit"
        />
        {{ "~" }}
        <Datepicker
          class="w-full h-12 text-center rounded-lg bg-gray-cool"
          v-model="store.currentTodo.endTime"
          :upper-limit="today"
          :lower-limit="endTimeLowerLimit"
        />
      </div>
      <div class="relative flex-1 h-12 rounded-lg bg-primary-100">
        <input
          class="upload-input"
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
        <span
          aria-hidden="true"
          class="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
        >
          Upload Image
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v3dp__datepicker {
  width: 100%;
}
.item {
  @apply rounded-lg bg-gray-cool;
}

.upload-input {
  @apply z-10 w-full h-full opacity-0;
}
</style>
