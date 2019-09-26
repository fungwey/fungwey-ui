
<script>
import TabNav from './tab-nav'

export default {
  name: 'FwTabs',

  components: {
    TabNav
  },

  props: {
    type: String,
    activeName: String,
    value: {},
    beforeLeave: Function,
    stretch: Boolean
  },

  provide () {
    return {
      rootTabs: this
    }
  },

  data () {
    return {
      currentName: this.value || this.activeName,
      panes: []
    }
  },

  watch: {
    activeName (value) {
      this.setCurrentName(value)
    },
    value (value) {
      this.setCurrentName(value)
    }
  },

  methods: {
    calcPaneInstances (isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'FwTabPane')
        // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]))
        if (isForceUpdate || panesChanged) {
          this.panes = panes
        }
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    },
    handleTabClick (tab, tabName, event) {
      if (tab.disabled) return
      this.setCurrentName(tabName)
      this.$emit('tab-click', tab, event)
    },
    setCurrentName (value) {
      const changeCurrentName = () => {
        this.currentName = value
        this.$emit('input', value)
      }
      if (this.currentName !== value && this.beforeLeave) {
        const before = this.beforeLeave(value, this.currentName)
        if (before && before.then) {
          before
            .then(() => {
              changeCurrentName()
              this.$refs.nav && this.$refs.nav.removeFocus()
            }, () => {
              // https://github.com/ElemeFE/element/pull/14816
              // ignore promise rejection in `before-leave` hook
            })
        } else if (before !== false) {
          changeCurrentName()
        }
      } else {
        changeCurrentName()
      }
    }
  },

  render (h) {
    let {
      type,
      handleTabClick,
      currentName,
      panes,
      editable,
      stretch
    } = this

    const navData = {
      props: {
        currentName,
        onTabClick: handleTabClick,
        editable,
        type,
        panes,
        stretch
      },
      ref: 'nav'
    }
    const header = (
      <div class={['fw-tabs__header']}>
        <tab-nav { ...navData }></tab-nav>
      </div>
    )
    const panels = (
      <div class="fw-tabs__content">
        {this.$slots.default}
      </div>
    )

    return (
      <div class={{
        'fw-tabs': true,
        'fw-tabs--card': type === 'card',
        'fw-tabs--border-card': type === 'border-card'
      }}>
        { [header, panels] }
      </div>
    )
  },

  created () {
    if (!this.currentName) {
      this.setCurrentName('0')
    }
  },

  mounted () {
    this.calcPaneInstances()
  },

  updated () {
    this.calcPaneInstances()
  }
}
</script>
