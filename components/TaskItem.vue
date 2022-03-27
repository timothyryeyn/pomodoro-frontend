<template>
  <nuxt-link
    class="bg-white flex justify-between p-4 rounded-md text-gray-800 cursor-pointer"
    :to="{ name: 'tasks-id', params: { id } }"
  >
    <div class="text-xl font-semibold">{{ title }}</div>
    <div class="flex gap-x-2 items-center">
      <div class="font-medium text-lg">{{ displayStats }}</div>
      <dropdown
        ><dropdown-item @click.native.prevent="clickEditHandler"
          >Edit</dropdown-item
        >
        <dropdown-item @click.native.prevent="clickDeleteHandler"
          >Delete</dropdown-item
        >
      </dropdown>
    </div>
  </nuxt-link>
</template>

<script>
import DropdownItem from './DropdownItem.vue'
export default {
  components: { DropdownItem },
  props: ['title', 'pomodoroStats', 'index', 'id'],
  methods: {
    clickEditHandler() {
      this.$router.push({ name: 'tasks-id-edit', params: { id: this.id } })
    },
    clickDeleteHandler() {
      this.$emit('taskDeleted', { index: this.index, id: this.id })
    },
  },
  computed: {
    displayStats() {
      return `${this.pomodoroStats.finished}/${this.pomodoroStats.total}`
    },
  },
  emits: ['taskDeleted'],
}
</script>

<style></style>
