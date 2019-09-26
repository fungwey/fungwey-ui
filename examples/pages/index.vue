<template>
  <div  class="pg-index">
    <div class="index-container">
      <p>FUNGWEY UI 组件库,仅供学习记录使用</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="{name: 'giud'}">开始使用</router-link>
        <a target="_blank" class="btn-github" href="https://github.com/fungwey/fungwey-ui">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: document.documentElement.clientHeight
    }
  }
}
</script>
<style type="text/scss" lang="scss">
  .pg-index {
    .index-container {
      width: 960px;
      margin: 0 auto;
      text-align: center;
      padding: 100px 0;
      p{
        margin-top: 56px;
        color: #f98b6f;
        font-size: 32px;
      }
    }
    .separate-panel{
      position: relative;
      .about{
        position: absolute;
        width: 100%;
        height: 200px;
        top: 20px;
        z-index: 9;
        background: #fff;
        text-align: center;
        a {
          color: #fff;
          background-image: linear-gradient(90deg, #fdc3c3 0%, #f98b6f 100%);
          box-shadow: 0 2px 6px 0 rgba(51,105,231,0.4);
          display: inline-block;
          width: 190px;
          height: 56px;
          margin: 0 35px;
          font-size: 18px;
          line-height: 56px;
          border-radius: 28px;
          transition: all .3s;
          cursor: pointer;
        }
        .btn-github{
          color: #f98b6f;
          border: 1px solid #f98b6f;
          background: #fff;
          box-shadow: none;
        }
      }
    }
  }
</style>
