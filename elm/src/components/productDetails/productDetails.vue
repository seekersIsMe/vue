<template>
  <transition name="food">
<div v-show="foodIsShow" class="food-wrapper" ref="selectFood">
  <div class="content">
    <div class="header-bgImg">
      <i class="icon-arrow_lift" @click.stop.prevent="hide">
      </i>
      <img :src="food.image" alt="">
    </div>
    <div class="buy-ctrl">
      <p class="food-name">{{food.name}}</p>
      <div class="bug-body">
        <div class="buy-ctrl-left">
          <p>
            <span class="salesVolume">月销{{food.sellCount}}份 </span>
            <span class="goodPercent">好评率{{food.rating}} </span>
          </p>
          <p>
            <span class="newPrice">￥{{food.price}} </span>
            <span class="oldPrice" v-show="food.oldPrice>0">￥{{food.oldPrice}} </span>
          </p>
        </div>
        <div class="right-bugctrl">
          <div v-if="isBuy" class="shopCartBtn" @click.stop.prevent="addShopCart">
            加入购物车
          </div>
          <div v-else>
            <cartcontrol :food="food" @add="_drop($event)"></cartcontrol>
          </div>
        </div>
      </div>
    </div>
    <tiao v-if="food.info"></tiao>
    <div class="food-text" v-if="food.info">
      <div class="title">
        商品介绍
      </div>
      <p class="text-body">
        {{food.info}}
      </p>
    </div>
    <tiao></tiao>
    <div class="shopEvaluate">
      <p class="title">
        商品评价
      </p>
      <ratingsSelect :des="des" @selectRating="selectRating"></ratingsSelect>
      <div class="hasContent" @click.stop.prevent="onlyContent">
        <i class="icon-check_circle" :class="{'hasContentBg':hasContent}"></i>
       <span class="text">只看有内容的评论</span>
      </div>
      <div class="list-wrapper">
        <ul>
          <li v-for="item in food.ratings" v-if="RatingShow(item,item.text)">
            <div class="customer">
                <span class="time">{{item.rateTime | getTime}}</span>
              <div class="pic">
                <span class="name">{{item.username}}</span>
                <img :src="item.avatar" alt="">
              </div>
            </div>
            <div class="content">
              <i :class="item.rateType===0?'icon-thumb_up':'icon-thumb_down'"></i>
              <span class="text">{{item.text}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  </transition>
</template>
<style lang="less">
@import "../../common/less/productDetails.less";
</style>
<script>
  import cartcontrol from 'component/cartcontrol/cartcontrol';
  import tiao from 'component/tiao/tiao';
  import ratingsSelect from 'component/ratingsSelect/ratingsSelect';
  import BScroll from 'better-scroll';
  import vue from 'vue';
  import {getTime_} from '../../common/js/getTime.js'
  const ALL=0,Recommend=1,TWEET=2;
  export default {
    props:{
      food:{
        type:Object
      }
    },
    data(){
      return {
      foodIsShow:false,
        des:[
          {
            active:true,
            text:'全部',
          },
          {
            active:false,
            text:'推荐',
          },
          {
            active:false,
            text:'吐槽'
          },
        ],
        selectType:ALL,
        hasContent:true
      }
    },
    created(){
//      this.food.ratings.forEach(function (p1) {
//        this.comment.push(p1)
//      }.bind(this))
    },
    computed:{
      isBuy(){
        if(this.food.count&&this.food.count>0){
          return false
        }else {
          return true
        }
      },
    },
    filters:{
//      getTime(t){
//         let date=new Date(t),
//        year=date.getFullYear()+'-',
//          month=date.getMonth()+1<10?'0'+date.getMonth()+1+'-':date.getMonth()+1+'-',
//          day=date.getDay()<10?'0'+date.getDay()+'-':date.getDay()+'-',
//          hour=date.getHours()<10?'0'+date.getHours()+'-':date.getHours()+'-',
//          minute=date.getMinutes()<10?'0'+date.getMinutes()+'-':date.getMinutes()+'-';
//        return year+month+day+hour+minute;
//      }
      getTime(t){
        let date=new Date(t);
        return getTime_(date);
      }
    },
    methods:{
      show(){
        this.foodIsShow=true;
        this.$nextTick(()=>{
          this._initFoodScroll()
        })
      },
      hide(){
//        vue.set(this,'foodIsShow',false)
        this.foodIsShow=false
      },
      _initFoodScroll(){
        if(!this.scroll){
          this.scroll=new BScroll(this.$refs.selectFood, {
            click: true
          })
        }else {
          this.scroll.refresh();
        }

      },
      addShopCart(){
        if(!this.food.hasOwnProperty('count')){
          vue.set(this.food,'count',1)
        }else {
          this.food.count=1;
        }
      },
      _drop(){
        this.$emit('add',event.target)
      },
      onlyContent(){
        this.hasContent=!this.hasContent
      },
      selectRating(type){
        console.log(type)
        switch (type){
          case 0:
            this.des[0].active=true;
            this.des[1].active=false;
            this.des[2].active=false;
            this.selectType=ALL;
            break;
          case 1:
            this.des[0].active=false;
            this.des[1].active=true;
            this.des[2].active=false;
            this.selectType=Recommend;
            break;
          case 2:
            this.des[0].active=false;
            this.des[1].active=false;
            this.des[2].active=true;
            this.selectType=TWEET;
            break
        }
      },
      RatingShow(rating,content){
//        debugger
        if(this.hasContent&&content==""){
          return false
        }
        if(this.selectType!=ALL){
          if(this.selectType!=rating.rateType){
            return false
          }else {
            return true
          }
        }else {
          return true
        }
      }
    },
    components:{
      cartcontrol,
      tiao,
      ratingsSelect
    }
  }
</script>
