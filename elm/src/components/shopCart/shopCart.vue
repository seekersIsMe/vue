<template>
  <div class="shopCart">
    <div class="shopCart_left" :class="{blackBg:totalCount>0,normalBg:totalCount==0}" @click.stop.prevent="shoplist">
      <div class="icon-wrapper">
        <div class="icon-round-bg" :class="{buleBg:totalCount>0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="shop-num" v-show="totalCount>0">
          {{totalCount}}
        </div>
      </div>
      <div class="total-price">
        ￥{{totalPrice}}元
      </div>
      <div class="delivery-cost">
        另需配送费￥{{deliveryPrice}}元
      </div>
    </div>
    <div class="shopCart_right" :class="{greenBg:totalPrice>=minPrice}">
      {{payDesc}}
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopCart-list" v-show="isShow" >
        <div class="header">
          <span class="span1">购物车</span>
          <span class="span2" @click.prevent.stop="empty">清空</span>
        </div>
        <div class="shop-list" ref="shopCartList">
          <ul>
            <li v-for="item in selectFood">
              <p class="name">{{item.name}}</p>
              <p class="price">￥{{item.price}}</p>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>
<style lang="less">
  @import "../../common/less/shopCart.less";
</style>
<script>
  import cartcontrol from 'component/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFood: {
        type: Array,
        default() {
          return [
            {
              count: 0,
              price: 0
            }
          ]
        }
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
        ],
        dropBalls: [],
        flod:false
      }
    },
//    create(){
//      this._scroll()
//    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFood.forEach((food) => {
          total += food.count * food.price;
        })
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFood.forEach((food) => {
          count += food.count;
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        }
        if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        }
        if (this.totalPrice >= this.minPrice) {
          return `去结算`;
        }
      },
      isShow(){
        if(!this.totalCount>0){
          this.flod = false;
          return false
        }
        let show=this.flod;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              //只要给实例化一个better-scroll对象，并且传入需要做滚动的dom，并且该dom宽高固定
              this.scroll = new BScroll(this.$refs.shopCartList, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        console.log('drop')
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {

            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el){
        let count=this.balls.length;

        while (count--){
          let ball=this.balls[count];
          if(ball.show){
            //这个地方getBoundingClientRect方法少些了一个括号，找了半天不知为啥动画不起作用，transition中after-enter绑定的afterDrop没有调用。。。
            let xy=ball.el.getBoundingClientRect();
            let x=xy.left-32;
            let y=-(window.innerHeight - xy.top - 22);
            el.style.display='';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el,done){
        //让浏览器重绘
        let rf = el.offsetHeight;
        //异步执行，优化动画
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          console.log('正在动画')
//          el.addEventListener('transitionend', done);
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el){
        console.log('动画结束后%o',this.dropBalls)
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      shoplist(){
        if(!this.totalCount){
          this.flod=false;
          return
        }
        this.flod=!this.flod;
      },
      empty(){
        this.selectFood.forEach((p1)=>{
          p1.count=0;
        })
      }
//      _scroll(){
//        this.shopCartscroll = new BScroll(this.$refs.shopCartScroll, {
//          click: true
//        });
//        this.shopCartscroll .on('scroll',(pos)=>{
//          //获取food ul列表顶部，距离其父级，也就是goods-list顶部的距离，y轴方向向下，所以向上拉，y坐标为负值
//          if (pos.y <= 0) {
//            this.scrollY=Math.abs(Math.round(pos.y));
//          }
//        })
//      }
    },
    components:{
      cartcontrol
    }
  }
</script>
