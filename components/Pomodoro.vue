<template>
  <div
    class="bg-white bg-opacity-20 px-6 py-8 rounded-md md:w-3/4 lg:w-1/2 xl:w-1/3 md:self-center"
  >
    <pomodoro-tabs>
      <pomodoro-tab>
        <pomodoro-timer />
      </pomodoro-tab>
    </pomodoro-tabs>
  </div>
</template>

<script>
import PomodoroTab from './PomodoroTab.vue'
import PomodoroTabs from './PomodoroTabs.vue'
import PomodoroTimer from './PomodoroTimer.vue'
export default {
  components: { PomodoroTabs, PomodoroTab, PomodoroTimer },
}
</script>

<style></style>
