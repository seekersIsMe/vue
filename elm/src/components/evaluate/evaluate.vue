<template>
    <div class="evaluate-wrapper" ref="evaluate">
      <div  class="evaluate">
        <div class="score-wrapper">
          <div class="grade">
            <p class="item1">{{seller.score}}</p>
            <p class="item2">综合评分</p>
            <p class="item3">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="star-wrapper">
            <p class="star-wrapper1">
          <span class="text1">
            服务态度
          </span>
              <span class="text2">
            <star :grade="seller.serviceScore"></star>
          </span>
            </p>
            <p class="star-wrapper2">
          <span class="text1">
            商品评价
          </span>
              <span class="text2">
            <star :grade="seller.foodScore"></star>
          </span>
            </p>
            <p class="star-wrapper3">
          <span class="text1">
            送达时间
          </span>
              <span class="text2">
            {{seller.deliveryTime}}
          </span>
            </p>
          </div>
        </div>
        <tiao></tiao>
        <div class="tab-wrapper">
          <ratingsSelect :des="des" @selectRating="selectRating"></ratingsSelect>
        </div>
        <div class="hasContent" @click.stop.prevent="onlyContent">
          <i class="icon-check_circle" :class="{'hasContentBg':hasContent}"></i>
          <span class="text">只看有内容的评论</span>
        </div>
        <div class="list-wrapper">
          <ul>
            <li v-for="item in data" v-if="RatingShow(item,item.text)">
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

</template>
<style lang="less">
@import "../../common/less/evaluate";
</style>
<script>
  import star from 'component/star/star';
  import ratingsSelect from 'component/ratingsSelect/ratingsSelect';
  import tiao from 'component/tiao/tiao';
  import {getTime_} from '../../common/js/getTime.js';
  import BScroll from 'better-scroll';
  const ERR_NO = 0;
  const ALL=0,Recommend=1,TWEET=2;
  export default {
    props: ['seller'],
    data() {
      return {
        data: [],
        des:[
          {
            active:true,
            text:'全部'
          },
          {
            active:false,
            text:'满意'
          },
          {
            active:false,
            text:'不满意'
          },
        ],
        selectType:ALL,
        hasContent:true
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno == ERR_NO) {
          this.data = response.data;
          this._initScroll0()
        }
      }, (err) => {
        console.log('请求数据失败')
      })
    },
    filters:{
      getTime(t){
        let date=new  Date(t);
        return getTime_(date)
      }
    },
    methods:{
      _initScroll0(){
        this.$nextTick(() => {
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.evaluate,{
              click:true
            })
          }else {
            this.scroll.refresh();
          }
          console.log(this.scroll)
        });

      },
      onlyContent(){
        this.hasContent=!this.hasContent;
        this._initScroll0();
      },
      selectRating(type){
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
    components: {
      star,
      ratingsSelect,
      tiao
    }


  }
</script>
