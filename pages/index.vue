<template>
  <main class="pt-4 flex flex-col justify-between items-center grow">
    <Pomodoro
      :pomodoroLength="5"
      :shortBreakLength="300"
      :longBreakLength="900"
    />
    <div class="mb-4 text-white">
      What is the
      <a class="underline font-semibold" href="">Pomodoro Technique</a>?
    </div>
  </main>
</template>

<script>
import Pomodoro from '~/components/Pomodoro.vue'
export default {
  auth: 'guest',
  components: { Pomodoro },
  name: 'IndexPage',
}
</script>
