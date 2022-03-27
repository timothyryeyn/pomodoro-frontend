<template>
  <main class="flex flex-col gap-y-8">
    <app-form @formSubmitted="userRegistration">
      <div class="flex flex-col gap-y-8">
        <app-form-field
          name="email"
          label="email"
          type="email"
          placeholder="Enter email"
        />
        <app-form-field
          name="password"
          label="password"
          type="password"
          placeholder="Enter password"
        />
      </div>
      <app-form-button>Register</app-form-button>
    </app-form>
    <div class="flex flex-col gap-y-1 self-center items-center text-white">
      Already have an account?
      <nuxt-link class="font-semibold underline text-lg" to="login"
        >Login</nuxt-link
      >
    </div>
  </main>
</template>

<script>
import AppForm from '~/components/AppForm.vue'
import AppFormButton from '~/components/AppFormButton.vue'
import AppFormField from '~/components/AppFormField.vue'
export default {
  auth: 'guest',
  components: { AppForm, AppFormField, AppFormButton },
  methods: {
    async userRegistration(credentials) {
      await this.$axios.$post('/register', credentials)
      await this.$auth.loginWith('local', {
        data: credentials,
      })
    },
  },
}
</script>

<style></style>
