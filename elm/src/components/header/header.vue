<template>
  <div class="header-container">
    <div class="header">
      <div class="header-top">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="content-text">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}送达
            </div>
            <div v-if="seller.supports" class="support">
              <span class="icon" :class="className[seller.supports[0].type]"></span>
              <span class="test">{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div class="click_more" v-if="seller.supports" @click="showDetails">
            <!--这里必须判断一下，seller.supports是否存在，否则报错-->
            <span>{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="header-bottom" @click="showDetails">
        <span class="bulletin"></span>
        <span class="text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
    </div>
    <transition name="fade">
      <div class="details" v-show="isShow">
        <div class="details-body">
          <h4>{{seller.name}}</h4>
          <star :grade="seller.score"></star>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <div v-if="seller.supports" class="bulletin">
            <div v-for="item in seller.supports">
              <span :class="className[item.type]" class="bulletin_icon"></span>
              <span class="text">{{item.description}}</span>
            </div>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin_content">
            <p>
              {{seller.bulletin}}
            </p>
          </div>
        </div>
        <div class="close" @click="hideDetails">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang='less'>
  /* #此处的 style要加上lang=less,不然就编译错误
  /*感觉全局引入封装的Mixins没什么用，后续再研究，可能是配置的问题,见网上说是webpack机制的问题*/
  /*背景图片路径的问题，路径为相对于该封装的less文件而言的*/
  /*第一种方式*/
  /*虽然在mian全局引用了bg_img.less,但还是要在单个组件里面引入封装的Mixins*/
  /* @import "../../common/less/mixin/bg_img.less";//
   .decrease{
     .bg_img('../../../components/header/decrease_1')
   }*/
  /*第二种方式，但是在header.less中还是要引入bg_img.less*/
  @import "../../common/less/header";
</style>
<script>
  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    created() {
      this.className = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },

    methods: {
      showDetails() {
        this.isShow = true;
      },
      hideDetails() {
        this.isShow = false;
      }
    },
    components: {
      star
    }
  }
</script>
