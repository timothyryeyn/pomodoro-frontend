<template>
  <main class="pb-20 px-2 flex flex-col">
    <app-form @formSubmitted="formSubmittedHandler">
      <app-form-field
        name="title"
        label="title"
        type="text"
        :value="currentTitle"
        placeholder="Enter task name"
      />
      <app-form-field
        name="description"
        label="description"
        type="textarea"
        :value="currentDescription"
        placeholder="Enter task description"
      />
      <app-form-field
        name="pomodoro_count"
        label="remaining pomodoro count"
        type="number"
        :value="remainingPomodoroCount"
        placeholder="Number of pomodoros"
      />
      <app-form-field
        name="pomodoro_length"
        label="pomodoro length"
        type="number"
        :value="currentPomodoroLength"
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
    const { id, title, description } = task
    const pomodoroLength = pomodoros[pomodoros.length - 1].length_in_minutes

    const finishedPomodoros = pomodoros.filter((p) => p.is_finished == 1)
    const unfinishedPomodoros = pomodoros.filter((p) => p.is_finished == 0)

    return {
      id,
      currentTitle: title,
      currentDescription: description,
      currentPomodoroLength: pomodoroLength,
      finishedPomodoros,
      unfinishedPomodoros,
    }
  },
  computed: {
    remainingPomodoroCount() {
      return this.unfinishedPomodoros.length
    },
  },
  methods: {
    async formSubmittedHandler(payload) {
      const result = this.validateFields(payload)

      if (!result.isSuccessful) {
        alert(result.outputMessage)
        return
      }

      const { title, description, pomodoro_count, pomodoro_length } =
        result.fields

      const action =
        pomodoro_count < this.remainingPomodoroCount
          ? 'DELETE'
          : pomodoro_count > this.remainingPomodoroCount
          ? 'ADD'
          : ''

      switch (action) {
        case 'DELETE':
          await this.deletePomodoros(pomodoro_count)
          break

        case 'ADD':
          await this.addPomodoros(pomodoro_count)
          break
      }
      await this.updatePomodoros(pomodoro_length)

      this.$router.push({ name: 'tasks' })
    },

    validateFields(fields) {
      let messages = []
      let isSuccessful = true

      if (fields.title.length < 1) {
        messages.push('Task title is required.')
        isSuccessful = false
      }

      if (fields.pomodoro_count < 0) {
        messages.push('Count of pomodoros cannot be less than 0.')
        isSuccessful = false
      }

      if (fields.pomodoro_length < 1) {
        messages.push('Length of pomodoro must be atleast 1 minute.')
        isSuccessful = false
      }

      let outputMessage = !isSuccessful
        ? messages.reduce((prev, curr) => `\u2022 ${prev}\n\u2022 ${curr}`)
        : ''

      return { outputMessage, isSuccessful, fields }
    },

    async updateTask(title, description) {
      await this.$axios.$patch('tasks', { title, description })
    },

    async updatePomodoros(pomodoro_length) {
      console.log('asdsad')
      for (let unfinishedPomodoro of this.unfinishedPomodoros) {
        await this.$axios.$patch(
          `tasks/${this.id}/pomodoros/${unfinishedPomodoro.id}`,
          {
            length_in_minutes: pomodoro_length,
          }
        )
      }
    },

    async deletePomodoros(pomodoroCount) {
      for (let i = this.remainingPomodoroCount - 1; i >= pomodoroCount; i--) {
        let toDeletePomodoroId = this.unfinishedPomodoros[i].id
        await this.$axios.$delete(
          `tasks/${this.id}/pomodoros/${toDeletePomodoroId}`
        )
        this.unfinishedPomodoros.splice(i, 1)
      }
    },

    async addPomodoros(pomodoroCount) {
      let pomodoro_count = pomodoroCount - this.remainingPomodoroCount

      const newPomodoros = await this.$axios.$post(
        `tasks/${this.id}/pomodoros`,
        {
          pomodoro_count,
          pomodoro_length: 25,
        }
      )

      this.unfinishedPomodoros = [...this.unfinishedPomodoros, ...newPomodoros]
    },
  },
}
</script>

<style></style>
