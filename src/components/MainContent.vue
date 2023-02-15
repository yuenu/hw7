<script setup lang="ts">
import IconTrash from "@/components/icons/IconTrash.vue";
import { ref, onMounted } from "vue";
import Datepicker from "vue3-datepicker";

const TEXTAREAR_MAX_LENGTH = 200;
const todoContent = ref("");
const remainingCount = ref(0);
const onKeyUp = () => {
  remainingCount.value = todoContent.value.length;
};

const imgPreview = ref<HTMLImageElement | null>(null);
const hasImage = ref(false);
onMounted(() => {
  if (imgPreview.value?.src) {
    hasImage.value = true;
  }
});

const onFileChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const files = target.files;
  if (!files || !files.length) return;
  imgPreview.value!.src = URL.createObjectURL(files[0]);
  imgPreview.value!.onload = function () {
    hasImage.value = true;
    URL.revokeObjectURL(imgPreview.value!.src);
  };
};

const picked = ref(new Date());
</script>

<template>
  <div class="flex-1 p-5 space-y-4">
    <div>
      <IconTrash
        role="button"
        class="w-6 h-6 ml-auto stroke-[#292D32] hover:stroke-red-600"
      />
    </div>
    <div>
      <input
        class="w-full p-4 item"
        type="text"
        placeholder="Press new item title"
      />
    </div>
    <div class="flex items-center justify-between h-[30vh] gap-5">
      <div class="relative w-3/5 h-full">
        <textarea
          v-model="todoContent"
          @keyup="onKeyUp"
          class="w-full h-full p-4 resize-none item"
          placeholder="Content..."
          :maxlength="TEXTAREAR_MAX_LENGTH"
        ></textarea>
        <span class="absolute text-sm pointer-events-none bottom-2 right-4"
          >{{ remainingCount }} / {{ TEXTAREAR_MAX_LENGTH }}</span
        >
      </div>
      <div class="relative flex-1 h-full overflow-hidden item">
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
      <div class="flex items-center w-3/5 gap-5">
        <Datepicker
          class="w-full h-12 text-center rounded-lg bg-gray-cool"
          v-model="picked"
        />
        {{ "~" }}
        <Datepicker
          class="w-full h-12 text-center rounded-lg bg-gray-cool"
          v-model="picked"
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
