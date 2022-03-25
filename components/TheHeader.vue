<template>
  <header>
    <nav class="flex justify-between py-2 my-2">
      <a class="text-3xl font-bold text-white">Pomodoro</a>
      <div class="flex gap-x-2">
        <nuxt-link
          class="bg-white bg-opacity-20 p-2 rounded-md font-medium text-white"
          v-for="({ name, link }, index) of navLinks"
          :key="index"
          :to="link"
          >{{ name }}</nuxt-link
        >
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        {
          name: 'Tasks',
          link: '/tasks',
        },
        {
          name: 'Login',
          link: '/login',
        },
      ],
    }
  },
}
</script>

<style></style>
