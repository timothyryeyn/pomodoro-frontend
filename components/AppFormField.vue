<template>
  <label class="flex flex-col font-semibold gap-y-2 uppercase text-lg">
    {{ label }}
    <textarea
      class="bg-gray-100 px-6 py-4 placeholder-gray-400 rounded-md text-black text-xl"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      cols="20"
      rows="10"
      v-if="isTextarea"
    >
    </textarea>
    <input
      class="bg-gray-100 px-6 py-4 placeholder-gray-400 rounded-md text-black text-xl"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      v-else
    />
  </label>
</template>

<script>
export default {
  props: ['type', 'placeholder', 'name', 'label', 'value'],
  computed: {
    isTextarea() {
      return this.type == 'textarea'
    },
  },
}
</script>

<style></style>
