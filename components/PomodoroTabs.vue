<template>
  <div class="flex flex-col gap-y-8">
    <ul class="flex gap-x-4 justify-center">
      <li
        class="bg-black bg-opacity-20 p-2 rounded-md font-semibold text-white"
        v-for="n in 3"
        :key="n"
      >
        Pomodoro
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
