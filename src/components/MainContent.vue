<script setup lang="ts">
import IconTrash from "@/components/icons/IconTrash.vue";
import { ref, onMounted, shallowRef } from "vue";
import { useObjectUrl } from "@vueuse/core";

export type FileEventTarget = EventTarget & { files: FileList };

const imgPreview = ref<HTMLImageElement | null>(null);

onMounted(() => {
  console.log("imgPreview", imgPreview);
});

// const loadFile = (evt: HTMLInputEvent | DragEvent) => {
//   let files =
//     (evt as HTMLInputEvent).target.files ||
//     (evt as DragEvent).dataTransfer!.files;
//   if (!files.length) return;
//   const url = URL.createObjectURL(files[0]);
//   imgPreview.value!.onload = function () {
//     URL.revokeObjectURL(url);
//   };
// };

const onFileChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const files = target.files;
  if (!files || !files.length) return;
  imgPreview.value!.src = URL.createObjectURL(files[0]);
  imgPreview.value!.onload = function () {
    URL.revokeObjectURL(imgPreview.value!.src);
  };
};
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
        class="w-full p-4 rounded-lg bg-gray-cool"
        type="text"
        placeholder="Press new item title"
      />
    </div>
    <div class="flex items-center justify-between h-32 gap-5">
      <textarea
        class="w-3/5 h-full p-4 rounded-lg bg-gray-cool"
        placeholder="Content..."
      ></textarea>
      <div class="bg-gray-cool">
        <input type="file" accept="image/*" @change="onFileChange" />
        <img ref="imgPreview" />
      </div>
    </div>
    <div class="flex h-10 gap-5">
      <div class="bg-">2022/05/07</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
