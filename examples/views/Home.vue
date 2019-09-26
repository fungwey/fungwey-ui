<template>
  <fw-tabs v-model="activeName" @tab-click="handleClick">
    <fw-tab-pane label="菜单1" name="first">菜单1</fw-tab-pane>
    <fw-tab-pane label="菜单2" name="second">菜单2</fw-tab-pane>
    <fw-tab-pane label="菜单3" name="third">菜单3</fw-tab-pane>
    <fw-tab-pane label="菜单4" name="fourth">菜单4</fw-tab-pane>
  </fw-tabs>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    }
  }
}
</script>
