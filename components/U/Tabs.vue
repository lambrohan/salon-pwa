<template lang="html">
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UTabs',
  props: {
    activeIndex: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      tabs: [], // all of the tabs
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectTab()
  },
  methods: {
    selectTab() {
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === this.activeIndex
      })
    },
  },
  watch: {
    activeIndex() {
      this.selectTab()
    },
  },
}
</script>
