<!--  -->
<template>
  <div class="fw-tabs__active-bar"></div>
</template>
<script>
export default {
  name: 'TabBar',

  props: {
    tabs: Array
  },

  inject: ['rootTabs']
}

</script>
