<template>
  <main class="pt-4 flex flex-col gap-y-8 pb-20">
    <div
      v-if="isFinished"
      class="bg-white bg-opacity-20 px-6 py-8 rounded-md md:w-3/4 lg:w-1/2 xl:w-1/3 md:self-center prose flex flex-col items-center"
    >
      <h1 class="text-center text-white font-bold">
        Congratulations! You have successfully finished this task!
      </h1>
      <div class="flex flex-col gap-y-2 items-center">
        <nuxt-link
          class="bg-white px-20 py-4 rounded-md text-2xl font-extrabold text-red-500 text-opacity-90 uppercase text-center hover:bg-black hover:text-white"
          :to="{ name: 'tasks-create' }"
        >
          create new task
        </nuxt-link>
        <span class="text-md font-medium text-white">OR</span>
        <nuxt-link
          class="bg-white px-20 py-4 rounded-md text-2xl font-extrabold text-red-500 text-opacity-90 uppercase text-center hover:bg-black hover:text-white"
          :to="{ name: 'tasks' }"
        >
          select existing task
        </nuxt-link>
      </div>
    </div>
    <Pomodoro
      v-else
      :pomodoroLength="pomodoroLength"
      :shortBreakLength="shortBreakLength"
      :longBreakLength="longBreakLength"
      @pomodoroFinished="pomodoroFinishedHandler"
    />

    <div class="flex flex-col gap-y-6 items-center text-white">
      <div class="flex justify-center gap-x-4">
        <div class="flex flex-col gap-y-1 text-4xl items-center">
          {{ prettyStats }}
          <small class="text-lg">pomodoros</small>
        </div>
        <div class="flex flex-col gap-y-1 text-4xl items-center">
          {{ pomodoros_stats.minutes_spent }}
          <small class="text-lg">minutes spent</small>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 items-center">
        <div class="text-3xl font-semibold">{{ title }}</div>
        <div class="prose prose-lg break-all indent-5 text-white">
          {{ description }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Pomodoro from '~/components/Pomodoro.vue'
export default {
  components: { Pomodoro },
  async asyncData({ $axios, params }) {
    const { task } = await $axios.$get(`tasks/${params.id}`)
    const { pomodoros } = await $axios.$get(
      `tasks/${params.id}/pomodoros?finished=false`
    )
    const { id, title, description, pomodoros_stats } = task
    const pomodoroLength =
      pomodoros.length > 0 ? pomodoros[0].length_in_minutes * 60 : 0
    const shortBreakLength = 300
    const longBreakLength = 900
    return {
      id,
      title,
      description,
      pomodoros_stats,
      pomodoros,
      pomodoroLength,
      shortBreakLength,
      longBreakLength,
    }
  },
  computed: {
    newPomodoroLength() {
      return this.pomodoros[0].length_in_minutes * 60
    },
    isFinished() {
      return this.pomodoros_stats.finished == this.pomodoros_stats.total
    },
    prettyStats() {
      return `${this.pomodoros_stats.finished} / ${this.pomodoros_stats.total}`
    },
  },
  methods: {
    async pomodoroFinishedHandler() {
      let finishedPomodoro = this.finishPomodoro()
      this.updatePomodoroStats(finishedPomodoro.length_in_minutes)
      await this.updatePomodoro(finishedPomodoro.id)
      if (!this.isFinished) {
        this.pomodoroLength = this.newPomodoroLength
      }
    },
    finishPomodoro() {
      const finishedPomodoro = this.pomodoros[0]
      this.pomodoros.shift()
      return finishedPomodoro
    },
    updatePomodoroStats(finishedPomodoroLength) {
      this.pomodoros_stats.finished++
      this.pomodoros_stats.minutes_spent += finishedPomodoroLength
    },
    async updatePomodoro(pomodoroId) {
      const url = `tasks/${this.$route.params.id}/pomodoros/${pomodoroId}`
      await this.$axios.$patch(url, { is_finished: 1 })
    },
  },
  created() {
    console.log(this.$nuxt.$route.name)
  },
}
</script>
