<template>
  <main class="flex flex-col gap-y-4">
    <div class="border-b-2 flex justify-between pb-4">
      <div class="text-4xl font-bold text-white">Tasks</div>
      <button
        class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white"
      >
        Create
      </button>
    </div>
    <div>
      <ul>
        <task-item />
      </ul>
    </div>
  </main>
</template>

<script>
import Dropdown from '~/components/Dropdown.vue'
import TaskItem from '~/components/TaskItem.vue'
export default {
  components: { Dropdown, TaskItem },
}
</script>

<style></style>
