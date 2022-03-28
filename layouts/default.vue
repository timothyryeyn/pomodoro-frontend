<template>
  <div
    class="flex flex-col gap-y-16 px-8 bg-red-500 bg-opacity-90 h-screen overflow-auto"
  >
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
export default {
  components: { TheHeader },
}
</script>

<style></style>
