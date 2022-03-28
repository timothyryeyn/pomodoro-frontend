<template>
  <main class="flex flex-col gap-y-8">
    <app-form @formSubmitted="userLogin">
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
      <div class="flex flex-col gap-y-4">
        <app-form-button>Login</app-form-button>
        <a
          class="font-semibold underline text-lg self-center hover:opacity-60"
          href=""
          >Forgot Password</a
        >
      </div>
    </app-form>
    <div class="flex flex-col gap-y-1 self-center items-center text-white">
      Do not have an account?
      <nuxt-link
        class="font-semibold underline text-lg text-white hover:text-black hover:text-opacity-60"
        :to="{ name: 'register' }"
        >Create account</nuxt-link
      >
    </div>
  </main>
</template>

<script>
import AppForm from '~/components/AppForm.vue'
import AppFormButton from '~/components/AppFormButton.vue'
import AppFormField from '~/components/AppFormField.vue'
export default {
  components: { AppForm, AppFormField, AppFormButton },
  methods: {
    async userLogin(credentials) {
      try {
        let response = await this.$auth.loginWith('local', {
          data: credentials,
        })
        console.log(await Notification.requestPermission())
        console.log(response)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>

<style></style>
