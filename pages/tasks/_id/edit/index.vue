<template>
  <main class="pb-20 px-2 flex flex-col">
    <app-form @formSubmitted="formSubmittedHandler">
      <app-form-field
        name="title"
        label="title"
        type="text"
        :value="title"
        placeholder="Enter task name"
      />
      <app-form-field
        name="description"
        label="description"
        type="textarea"
        :value="description"
        placeholder="Enter task description"
      />
      <app-form-field
        name="pomodoro_count"
        label="pomodoro count"
        type="number"
        :value="pomodoros_stats.total"
        placeholder="Number of pomodoros"
      />
      <app-form-field
        name="pomodoro_length"
        label="pomodoro length"
        type="number"
        :value="pomodoroLength"
        placeholder="Length of pomodoro in minutes"
      />
      <app-form-button>Update Task</app-form-button>
    </app-form>
  </main>
</template>

<script>
import AppForm from '~/components/AppForm.vue'
import AppFormButton from '~/components/AppFormButton.vue'
import AppFormField from '~/components/AppFormField.vue'
export default {
  components: { AppForm, AppFormField, AppFormButton },
  async asyncData({ $axios, params }) {
    const { task } = await $axios.$get(`tasks/${params.id}`)
    const { pomodoros } = await $axios.$get(`tasks/${params.id}/pomodoros`)
    const { id, title, description, pomodoros_stats } = task
    const pomodoroLength = pomodoros[0].length_in_minutes

    return {
      id,
      title,
      description,
      pomodoros_stats,
      pomodoroLength,
    }
  },
  methods: {
    //TO ADD
    async formSubmittedHandler(payload) {
      const { title, description, pomodoro_count, pomodoro_length } = payload
      const task = await this.$axios.$post('tasks', { title, description })
      await this.$axios.$post(`tasks/${task.id}/pomodoros`, {
        pomodoro_count,
        pomodoro_length,
      })
      this.$router.push({ name: 'tasks' })
    },
  },
}
</script>

<style></style>
