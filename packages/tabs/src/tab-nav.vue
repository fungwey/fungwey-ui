
<script>
import TabBar from './tab-bar'
function noop () {}

export default {
  name: 'TabNav',

  components: {
    TabBar
  },

  inject: ['rootTabs'],

  props: {
    panes: Array,
    currentName: String,
    onTabClick: {
      type: Function,
      default: noop
    },
    type: String,
    stretch: Boolean
  },

  data () {
    return {
      scrollable: false,
      focusable: true
    }
  },

  methods: {

    removeFocus () {
      this.isFocus = false
    },
    visibilityChangeHandler () {
      const visibility = document.visibilityState
      if (visibility === 'hidden') {
        this.focusable = false
      } else if (visibility === 'visible') {
        setTimeout(() => {
          this.focusable = true
        }, 50)
      }
    },
    windowBlurHandler () {
      this.focusable = false
    },
    windowFocusHandler () {
      setTimeout(() => {
        this.focusable = true
      }, 50)
    }
  },

  render (h) {
    const {
      type,
      panes,
      onTabClick,
      navStyle,
      removeFocus
    } = this

    const tabs = this._l(panes, (pane, index) => {
      let tabName = pane.name || pane.index || index

      pane.index = `${index}`

      const tabLabelContent = pane.$slots.label || pane.label
      const tabindex = pane.active ? 0 : -1
      return (
        <div
          class={{
            'fw-tabs__item': true,
            'is-active': pane.active
          }}
          id={`tab-${tabName}`}
          key={`tab-${tabName}`}
          aria-controls={`pane-${tabName}`}
          role="tab"
          aria-selected={ pane.active }
          ref="tabs"
          tabindex={tabindex}
          refInFor
          on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev) }}
        >
          {tabLabelContent}
        </div>
      )
    })
    return (
      <div class={['fw-tabs__nav-wrap']}>
        <div class={['fw-tabs__nav-scroll']} ref="navScroll">
          <div
            class={['fw-tabs__nav']}
            ref="nav"
            style={navStyle}
            role="tablist"
          >
            {!type ? <tab-bar tabs={panes}></tab-bar> : null}
            {tabs}
          </div>
        </div>
      </div>
    )
  }
}
</script>
