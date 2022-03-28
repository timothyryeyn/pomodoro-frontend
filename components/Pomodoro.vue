<template>
  <div
    class="bg-white bg-opacity-20 px-6 py-8 rounded-md md:w-3/4 lg:w-1/2 xl:w-1/3 md:self-center"
  >
    <pomodoro-tabs
      ref="tabs"
      :showWarning="isTimerRunning"
      @changeTab="changeTabHandler"
    >
      <pomodoro-tab title="Pomodoro">
        <pomodoro-timer
          @timerEvent="timerEventHandler"
          name="pomodoro"
          :length="pomodoroLength"
          key="p"
          ref="pomodoro"
        />
      </pomodoro-tab>
      <pomodoro-tab title="Short Break">
        <pomodoro-timer
          @timerEvent="timerEventHandler"
          name="short break"
          :length="shortBreakLength"
          key="sb"
          ref="shortBreak"
        />
      </pomodoro-tab>
      <pomodoro-tab title="Long Break">
        <pomodoro-timer
          @timerEvent="timerEventHandler"
          name="long break"
          :length="longBreakLength"
          key="lb"
          ref="longBreak"
        />
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
  data() {
    return {
      isTimerRunning: false,
      pomodoros: 0,
    }
  },
  computed: {
    tabs() {
      return this.$refs.tabs
    },
    pomodoroTimer() {
      return this.$refs.pomodoro
    },
    shortBreakTimer() {
      return this.$refs.shortBreak
    },
    longBreakTimer() {
      return this.$refs.longBreak
    },
    willTakeLongBreak() {
      return this.pomodoros % 4 === 0
    },
  },
  props: ['pomodoroLength', 'shortBreakLength', 'longBreakLength'],
  emits: ['pomodoroFinished'],
  methods: {
    timerEventHandler(payload) {
      const { timerName, isRunning, finished } = payload
      this.isTimerRunning = isRunning
      if (finished.isTrue) {
        this.changeTimer(timerName)
      }
    },
    changeTabHandler(timerName) {
      switch (timerName) {
        case 'pomodoro':
          this.pomodoroTimer.reset()
          break
        case 'short break':
          this.shortBreakTimer.reset()
          break
        case 'long break':
          this.longBreakTimer.reset()
          break
      }
    },
    changeTimer(timerName) {
      switch (timerName) {
        case 'pomodoro':
          this.pomodoros++
          this.tabs?.selectTab(
            this.pomodoros > 0 && this.willTakeLongBreak ? 2 : 1,
            true
          )
          this.$emit('pomodoroFinished')
          new Notification(
            `Time to take a ${this.willTakeLongBreak ? 'long' : 'short'} break!`
          )

          break
        case 'short break':
        case 'long break':
          new Notification('Time to work!')
          this.tabs?.selectTab(0, true)
          break
      }
    },
  },
}
</script>

<style></style>
