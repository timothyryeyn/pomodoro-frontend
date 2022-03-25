<template>
  <main class="pt-4 flex flex-col gap-y-8 pb-20">
    <div
      v-if="true"
      class="bg-white bg-opacity-20 px-6 py-8 rounded-md md:w-3/4 lg:w-1/2 xl:w-1/3 md:self-center prose flex flex-col items-center"
    >
      <h1 class="text-center text-white font-bold">
        Congratulations! You have successfully finished this task!
      </h1>
      <div class="flex flex-col gap-y-2 items-center">
        <button
          class="bg-white px-20 py-4 rounded-md text-2xl font-extrabold text-red-500 text-opacity-90 uppercase"
        >
          create new task
        </button>
        <span class="text-md font-medium text-white">OR</span>
        <button
          class="bg-white px-20 py-4 rounded-md text-2xl font-extrabold text-red-500 text-opacity-90 uppercase"
        >
          select existing task
        </button>
      </div>
    </div>
    <Pomodoro v-else />

    <div class="flex flex-col gap-y-6 items-center text-white">
      <div class="flex justify-center gap-x-4">
        <div class="flex flex-col gap-y-1 text-4xl items-center">
          4/10
          <small class="text-lg">pomodoros</small>
        </div>
        <div class="flex flex-col gap-y-1 text-4xl items-center">
          25
          <small class="text-lg">minutes spent</small>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 items-center">
        <div class="text-3xl font-semibold">Clean Room</div>
        <div class="prose prose-lg break-all indent-5 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Pomodoro from '~/components/Pomodoro.vue'
export default {
  components: { Pomodoro },
  name: 'IndexPage',
}
</script>
