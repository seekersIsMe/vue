<template>
  <div class="tab">
    <div :class="{'active0':des[0].active}" class="tab1"  @click.stop.prevent="select(0)" >{{des[0].text}}</div>
    <div :class="{'active1':des[1].active}" class="tab2" @click.stop.prevent="select(1)">{{des[1].text}} </div>
    <div :class="{'active2':des[2].active}" class="tab3" @click.stop.prevent="select(2)">{{des[2].text}}</div>
  </div>
</template>
<style lang="less">
  .tab {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 18px 0 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab > div {
    margin-right: 8px;
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    &.active0{
      color: #fff;
      background-color: #00a0dc;
    }
    &.active1{
      color: #fff;
      background-color: #00a0dc;
    }
    &.active2{
      background-color:#4d555d;
      color: #fff;
    }
  }
  .tab .tab1{
    color: rgb(77,85,93);
    background-color: #ccecf8;
  }
  .tab .tab2{
    color: rgb(77,85,93);
    background-color: #ccecf8;
  }
  .tab .tab3{
    color: rgb(77,85,93);
    background-color: #e9ebec;
  }


</style>
<script>
export default {
  props:{
    des:{
      type:Array
    }
  },
  methods:{
    select(type){
      this.$emit('selectRating',type)
    }
  }
}
</script>
