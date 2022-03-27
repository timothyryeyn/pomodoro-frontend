<template>
  <div class="tab" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Tab',
    },
  },
  data() {
    return {
      isActive: true,
      timer: null,
    }
  },
}
</script>

<style></style>
