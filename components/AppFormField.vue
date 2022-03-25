<template>
  <label class="flex flex-col font-semibold gap-y-2 uppercase text-lg">
    {{ label }}
    <input
      class="bg-gray-100 px-6 py-4 placeholder-gray-400 rounded-md text-black text-xl"
      :type="type"
      :placeholder="placeholder"
    />
  </label>
</template>

<script>
export default {
  props: ['type', 'placeholder', 'name', 'label'],
}
</script>

<style></style>
