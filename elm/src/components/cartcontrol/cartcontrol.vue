<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease" v-show="food.count&&food.count>0" @click.stop.prevent="decrease($event)">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="num" v-show="food.count&&food.count>0">
      {{food.count}}
    </div>
    <div class="add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<style lang="less">
  .cartcontrol {
    display: flex;
    .decrease, .add {
      font-size: 24px;
      i {
        display: inline-block;
        line-height: 24px;
        width: 24px;
        height: 24px;
        padding: 6px;
        color: rgb(0, 160, 220);
      }
    }
    //外层控制平移，内层控制滚动
    .decrease{
     i{
       transform: rotate(0);
       transition: all 0.5s linear;
     }
      &.move-enter-active,&.move-leave-active{
        transition:all 0.5s linear;
      }
      &.move-enter,&.move-leave-active{
        transform: translate3d(24px,0,0);
        opacity: 0;
        i{
          transform: rotate(180deg);
        }
      }
    }
    .num {
      font-size: 10px;
      line-height: 24px;
      padding-top: 6px;
      width: 12px;
    }
  }
</style>
<script>
  import vue from  'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods:{
      addCart(event){
        if (!event._constructed) {
          return;
        }
        if(this.food.count){
          this.food.count++
        }else {
          //官网props教程
          //https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
          //子组件中不要通过Object.assign()修改props中数据，会报错；
          // 要让父组件的状态随子组件中数据变化而变化，就是在子组件中通过修改父组件中传过来的props来修改父组件中的数据，已达到父组件中与该数据有依赖的模块发生变化
          vue.set(this.food,'count',1);
          //使用如下方式会报错，vue.set()方法封装的具体原理还需进一步研究
//          this.food=Object.assign({},this.food,{
//            'count':1
//          })
        }
        //这里可用通过$emit实现子组件向父组件通信，事件触发
        this.$emit('add',event.target)
      },
      decrease(event){
        if (!event._constructed) {
          return;
        }
        if(this.food.count>0) {
          this.food.count--
        }
      }
    }
  }
</script>
