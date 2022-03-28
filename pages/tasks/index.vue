<template>
  <main class="flex flex-col gap-y-4 md:w-3/4 lg:w-1/2 md:self-center grow">
    <div class="border-b-2 flex justify-between pb-4">
      <div class="text-4xl font-bold text-white">Tasks</div>
      <nuxt-link
        class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white hover:bg-opacity-40"
        :to="{ name: 'tasks-create' }"
      >
        Create
      </nuxt-link>
    </div>
    <div
      class="grow flex items-center justify-center text-2xl font-medium text-white"
      v-if="!hasTasks"
    >
      You currently have no tasks
    </div>
    <div v-else>
      <ul class="flex flex-col gap-y-2">
        <task-item
          v-for="({ id, title, pomodoros_stats }, index) of tasks"
          :key="id"
          :title="title"
          :pomodoroStats="pomodoros_stats"
          :index="index"
          :id="id"
          @taskDeleted="deleteTask"
        />
      </ul>
    </div>
  </main>
</template>

<script>
import Dropdown from '~/components/Dropdown.vue'
import TaskItem from '~/components/TaskItem.vue'

export default {
  components: { Dropdown, TaskItem },
  async asyncData({ $axios }) {
    const data = await $axios.$get('/tasks')
    console.log(data)
    return { tasks: data.tasks }
  },
  computed: {
    hasTasks() {
      return this.tasks.length > 0
    },
  },
  methods: {
    async deleteTask({ index, id }) {
      if (!confirm('Confirm delete task?')) {
        return
      }
      this.tasks.splice(index, 1)
      await this.$axios.$delete(`tasks/${id}`)
      alert('Successfully Deleted!')
    },
  },
  created() {
    console.log(this.hasTasks)
  },
}
</script>

<style></style>
