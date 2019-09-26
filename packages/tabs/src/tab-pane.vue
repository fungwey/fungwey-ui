<template>
  <div
    class="fw-tab-pane"
    v-if="active"
    v-show="active"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'FwTabPane',

  componentName: 'FwTabPane',

  props: {
    label: String,
    labelContent: Function,
    name: String,
    disabled: Boolean,
    lazy: Boolean
  },

  data () {
    return {
      index: null
    }
  },

  computed: {
    active () {
      const active = this.$parent.currentName === (this.name || this.index)
      return active
    },
    paneName () {
      return this.name || this.index
    }
  },

  updated () {
    this.$parent.$emit('tab-nav-update')
  }
}
</script>
