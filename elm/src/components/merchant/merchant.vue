<template>
<div class="merchant-wrapper" ref="merchant">
  <div class="content">
    <div class="merchant-header">
      <div class="header-left">
        <p>{{seller.name}}</p>
        <div class="star-wrapper">
          <star :grade="seller.score"></star>
          <span>
            ({{seller.ratingCount}})
          </span>
          <span>
            月销{{seller.sellCount}}单
          </span>
        </div>
      </div>
      <div class="header-right" @click.stop.prevent="change">
        <div class="heart" :class="{active:heartChange}">
          <i class="icon-favorite"></i>
        </div>
        <p>{{heartChange?'已收藏':'收藏'}}</p>
      </div>
    </div>
    <div class="server">
      <div class="sendPrice">
      <p>起送价</p>
        <p><span>{{seller.minPrice}}</span><span>元</span></p>
      </div>
      <div class="deliveryPrice">
        <p>商家配送</p>
        <p><span>{{seller.deliveryPrice}}</span><span>元</span></p>
      </div>
      <div class="deliveryTime">
        <p>平均配送时间</p>
        <p><span>{{seller.deliveryTime}}</span><span>分钟</span></p>
      </div>
    </div>
    <tiao></tiao>
    <div class="activity">
      <p class="title">公告与活动</p>
      <p class="bulletin">{{seller.bulletin}}</p>
      <ul>
        <li v-for="(item,index) in seller.supports">
          <span :class="className[item.type]"></span>
          <span>{{item.description}}</span>
        </li>
      </ul>
    </div>
    <tiao></tiao>
    <div class="realisticPicture">
      <p class="title">商家实景</p>
      <div class="pic">
        <img :src="item" alt="" v-for="item in seller.pics">
      </div>
    </div>
    <tiao></tiao>
    <div class="message">
      <p class="title">
        商家信息
      </p>
      <div class="msg" v-for="item in seller.infos">
        {{item}}
      </div>
    </div>
    <!--<test :test="test"></test>-->
  </div>
</div>
</template>
<style lang="less">
@import '../../common/less/merchant';
</style>
<script>
import star from 'component/star/star';
import tiao from 'component/tiao/tiao';
import BScroll from 'better-scroll';
import test from 'component/test/test'
export default {
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return {
      className:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heartChange:false,
      redHeart:{
        color:'red'
      },
      test:{
        ary:[
          1,2,3,4,5,6
        ]
      }
    }
  },
  created(){
    this.$nextTick(()=>{
      if(!this.scroll){
        this.scroll=new BScroll(this.$refs.merchant,{
          click:true
        })
      }else {
        this.scroll.refresh()
      }
    })
  },
  methods:{
    change(){
      this.heartChange=!this.heartChange
    }
  },
  computed:{
  },
  components:{
    star,
    tiao,
    test
  }
}
</script>
