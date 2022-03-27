<template>
  <form
    class="bg-white flex flex-col px-6 py-8 rounded-md gap-y-12 md:w-3/4 lg:w-1/2 md:self-center"
    @submit.prevent="submit"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  methods: {
    submit(event) {
      //add type checking
      const datas = Object.fromEntries(new FormData(event.target))
      this.$emit('formSubmitted', datas)
    },
  },
  emits: ['formSubmitted'],
}
</script>

<style></style>
