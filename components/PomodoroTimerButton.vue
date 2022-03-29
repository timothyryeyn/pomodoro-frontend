<template>
  <button
    class="bg-white px-20 py-4 rounded-md text-2xl font-extrabold text-red-500 text-opacity-90 uppercase hover:bg-black hover:text-white"
    :id="id"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['id'],
}
</script>

<style></style>
