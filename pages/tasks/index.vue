<template>
  <main class="flex flex-col gap-y-4 md:w-3/4 lg:w-1/2 md:self-center">
    <div class="border-b-2 flex justify-between pb-4">
      <div class="text-4xl font-bold text-white">Tasks</div>
      <button
        class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white"
      >
        Create
      </button>
    </div>
    <div>
      <ul class="flex flex-col gap-y-2">
        <task-item />
        <li
          class="bg-white flex justify-between p-4 rounded-md text-gray-500 cursor-pointer"
        >
          <div class="flex gap-x-2 items-center">
            <div class="text-xl font-semibold line-through">Clean Room</div>
            <span>finished</span>
          </div>
          <div class="flex gap-x-2 items-center text-gray-500">
            <div class="font-medium text-lg">5/10</div>
            <dropdown />
          </div>
        </li>
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
