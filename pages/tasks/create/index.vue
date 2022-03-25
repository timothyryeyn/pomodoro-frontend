<template>
  <main class="pb-20 px-2">
    <app-form>
      <app-form-field
        name="title"
        label="title"
        type="text"
        placeholder="Enter task name"
      />
      <app-form-field
        name="description"
        label="description"
        type="text"
        placeholder="Enter task description"
      />
      <app-form-field
        name="pomodoro count"
        label="pomodoro count"
        type="number"
        placeholder="number of pomodoros"
      />
      <app-form-field
        name="pomodoro length"
        label="pomodoro length"
        type="number"
        placeholder="length of pomodoro in minutes"
      />
      <app-form-button>Add Task</app-form-button>
    </app-form>
  </main>
</template>

<script>
import AppForm from '~/components/AppForm.vue'
import AppFormButton from '~/components/AppFormButton.vue'
import AppFormField from '~/components/AppFormField.vue'
export default {
  components: { AppForm, AppFormField, AppFormButton },
}
</script>

<style></style>
