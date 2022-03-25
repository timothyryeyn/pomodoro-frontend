<template>
  <form
    class="bg-white flex flex-col px-6 py-8 rounded-md gap-y-12 md:w-3/4 lg:w-1/2 md:self-center"
    @submit.prevent=""
  >
    <slot></slot>
  </form>
</template>

<script>
export default {}
</script>

<style></style>
