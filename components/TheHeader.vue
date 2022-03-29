<template>
  <header>
    <nav class="flex justify-between py-2 my-2">
      <nuxt-link :to="{ name: 'index' }" class="text-3xl font-bold text-white"
        >Pomodoro</nuxt-link
      >
      <div class="flex gap-x-2" v-if="isAuthenticated">
        <nuxt-link
          class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white hover:bg-opacity-40"
          v-for="({ name, link }, index) of authNavLinks"
          :key="index"
          :to="link"
          >{{ name }}</nuxt-link
        >
        <button
          class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white hover:bg-opacity-40"
          @click="userLogout"
        >
          Logout
        </button>
      </div>
      <div class="flex gap-x-2" v-else>
        <nuxt-link
          class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white hover:bg-opacity-40"
          v-for="({ name, link }, index) of guestNavLinks"
          :key="index"
          :to="link"
          >{{ name }}</nuxt-link
        >
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      authNavLinks: [
        {
          name: 'Tasks',
          link: { name: 'tasks' },
        },
      ],
      guestNavLinks: [
        {
          name: 'Login',
          link: { name: 'login' },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async userLogout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
