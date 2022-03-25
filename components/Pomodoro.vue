<template>
  <div class="bg-white bg-opacity-20 p-4 rounded-md">
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
