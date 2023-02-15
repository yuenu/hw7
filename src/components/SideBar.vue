<template>
  <div class="h-screen bg-primary-200 w-[250px]">
    <h1 class="px-3 py-4 text-lg font-semibold">Demo Todo List</h1>
    <div class="mb-6 space-y-2">
      <div class="px-5 py-3 truncate bg-primary-300 item-active">1. Item</div>
      <div class="px-5 py-3 truncate bg-primary-300">2. Item</div>
    </div>
    <button
      type="button"
      class="w-[200px] py-2 mx-auto text-lg bg-primary-100 rounded-xl block"
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
