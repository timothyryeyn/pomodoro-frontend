<template>
  <div class="flex flex-col gap-y-8 items-center">
    <div class="text-8xl text-white font-semibold">
      {{ prettyTime }}
    </div>
    <div class="flex gap-x-4 items-center relative">
      <pomodoro-timer-button
        v-if="!isRunning"
        @click.native="start"
        id="start-button"
        >start</pomodoro-timer-button
      >
      <pomodoro-timer-button
        v-if="isRunning"
        @click.native="stop"
        id="stop-button"
        >stop</pomodoro-timer-button
      >
      <button
        class="absolute -right-14 text-white hover:text-black"
        v-if="isRunning"
        @click="finish(true)"
        id="finish-button"
      >
        <svg
          class="fill-current h-12 w-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import PomodoroTimerButton from './PomodoroTimerButton.vue'
export default {
  components: { PomodoroTimerButton },
  data() {
    return {
      minutes: 0,
      seconds: 0,
      time: 0,
      timer: null,
      isRunning: false,
    }
  },
  props: ['name', 'length'],
  computed: {
    prettyTime() {
      let time = this.time / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)

      secondes = secondes < 10 ? `0${secondes}` : secondes

      return minutes + ':' + secondes
    },
  },
  watch: {
    length(val) {
      this.time = val
    },
  },
  emits: ['timerEvent'],
  methods: {
    start() {
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0) {
            //persist time
            this.time--
          } else {
            this.finish()
          }
        }, 1000)
      }
      this.emitTimerEvent(true, false, false)
    },
    stop() {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
      this.emitTimerEvent(false, false, false)
    },
    finish(forced = false) {
      if (forced) {
        if (!confirm('Stop current timer?')) {
          return
        }
        forced = true
      }
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
      this.time = this.length
      this.emitTimerEvent(true, true, forced)
    },
    reset() {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
      this.time = this.length
      this.emitTimerEvent(false, false, false)
    },
    emitTimerEvent(isRunning, isFinished, isForced) {
      this.$emit('timerEvent', {
        timerName: this.name,
        isRunning: isRunning,
        finished: {
          isTrue: isFinished,
          isForced: isForced,
        },
      })
    },
  },
  created() {
    this.time = this.length
  },
}
</script>

<style></style>
