<template>
  <div id="app">
    <header-elm :seller="seller"></header-elm>
    <div class="router_link">
      <router-link to="/goods" tag="span">商品</router-link>
      <router-link to="/evaluate" tag="span">评价</router-link>
      <router-link to="/merchant" tag="span">商家</router-link>
    </div>
    <div class="router_view">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>
<script>
  import headerElm from 'component/header/header';

  const ERR_NO = 0;
  export default {
    name: 'App',
    created() {
      this.$http.get('/api/seller').then(function (data) {
        data = data.body;
        if (data.errno == ERR_NO) {
          this.seller = data.data
        }
      }, function (err) {
        console.log('数据请求错误')
      })
    },
    data() {
      return {
        seller: {}
      }
    },
    components: {
      headerElm
    }
  }
</script>
<style lang="less">
  .router_link{
    height: 40px;
    line-height:40px;
    display: flex;
    justify-content: space-around;
    color: rgb(77,85,93);
    font-size: 14px;
    .active{
      color: rgb(240,20,20);
    }
  }
</style>
