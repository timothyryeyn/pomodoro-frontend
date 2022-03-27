<template>
  <div class="flex flex-col gap-y-8">
    <ul class="flex gap-x-4 justify-center">
      <li
        class="bg-black bg-opacity-20 p-2 rounded-md font-semibold text-white cursor-pointer"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs
    }
  },
  props: {
    showWarning: Boolean,
  },
  emits: ['changeTab'],
  methods: {
    selectTab(i, omitWarning = false) {
      if (this.showWarning && omitWarning == false) {
        if (!confirm('Stop current timer?')) {
          return
        }
      }
      this.selectedIndex = i
      //MOVE TO EVENT
      let timerName = this.tabs[i].$children[0].name
      this.$emit('changeTab', timerName)
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    },
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectTab(0)
  },
}
</script>

<style></style>
