<template>
  <div>
    <div class="goods">
      <div class="menu" ref="menu" >
        <ul >
          <li v-for="(item,index) in goods" :class="{'current':getIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
             <span v-if="item.type>0" :class="className[item.type]" class="icon"></span>
          <span>{{item.name}}</span>
          </span>
          </li>
        </ul>
      </div>
      <div class="goods-list" ref="goodsList">
        <ul >
          <li v-for="item in goods" class="food-list food-list-hook">
            <div class="title">{{item.name}}</div>
            <ul >
              <li v-for="food in item.foods" class="food-item" @click.stop.prevent="selectFood(food,$event)">
                <div class="food-icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="food-detail">
                  <p class="name">{{food.name}}</p>
                  <p class="detail">
                    <span class="sales">月销{{food.sellCount}}份</span>
                    <span class="feedback">好评率{{food.rating}}</span>
                  </p>
                  <p class="price">
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    <span class="now">￥{{food.price}}</span>
                  </p>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addCart"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFood="getSelectFood" ref="ball"></shopCart>
    </div>
      <productDetails  :food="clickFood"  ref="food" @add="addCart"></productDetails>
  </div>

</template>
<style lang="less">
  @import "../../common/less/goods.less";
</style>
<script>
  import BScroll from 'better-scroll'
  import shopCart from 'component/shopCart/shopCart'
  import cartcontrol from 'component/cartcontrol/cartcontrol';
  import productDetails from 'component/productDetails/productDetails'
  const ERR_NO = 0;
  export default {
    props: ['seller'],
    data() {
      return {
        goods: [],
        scrollHeight:[],
        scrollY:0,
        clickFood:{}
      }
    },
    created() {
      this.className = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno == ERR_NO) {
          this.goods = response.data;
          this.$nextTick(() => {//　在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。
                                //在计算一些跟dom相关的东西时，一定要保证该dom已经被渲染了
            this._initScroll();
            this._calculateHeight();
          });
        }
      })
    },
    methods:{
      _initScroll(){
        this.meunScroll = new BScroll(this.$refs.menu, {
          click: true//bScroll插件监听了touchstart和touchend事件，阻止了默认事件，在选择点击菜单的时候会没有效果，
          // 所以要在初始化的时候设置click为true
      });

        this.foodsScroll = new BScroll(this.$refs.goodsList, {
          click: true,
          probeType: 3
        });
        //使用isScroll封装的监听事件，回调函数参数为坐标，内容底部在外层容器坐标系中的位置坐标
        this.foodsScroll.on('scroll',(pos)=>{
          //获取food ul列表顶部，距离其父级，也就是goods-list顶部的距离，y轴方向向下，所以向上拉，y坐标为负值
          if (pos.y <= 0) {
            this.scrollY=Math.abs(Math.round(pos.y));
          }
        })
      },
      _calculateHeight(){
        let foodList=this.$refs.goodsList.getElementsByClassName('food-list-hook');
        let height=0;
        this.scrollHeight.push(height);
        for(let i=0 ;i<foodList.length;i++){
          let item=foodList[i];
          height+=item.clientHeight;
          this.scrollHeight.push(height);
        }
      },
      selectMenu(index,event){
        if (!event._constructed) {//bScroll 自己封装的派发click事件，该事件对象有_constructed，原生的没有该属性
          return;                  //在pc端，原生点击会被监听到，没有被阻止，在初始化bScroll的时候又派发了click事件，会执行两次
                                  //为了pc和移动端的效果一样,这里做下判断，不执行原生的click事件
        }
        let foodList=this.$refs.goodsList.getElementsByClassName('food-list-hook');
        let el=foodList[index];//获取到要滚动到的dom
        this.foodsScroll.scrollToElement(el,300);//调用bScroll的scrollToElement，滚动到哪一个dom，以及滚动的快慢（时间）
      },
      selectFood(food,ev){
        if(!ev._constructed){
          return
        }
        this.clickFood=food;
        console.log('显示%o',ev)
        this.$refs.food.show();
      },
      addCart(target){
        this._drop(target);
        //异步执行，优化动画
//        this.$nextTick(()=>{
//          this.$refs.ball.drop(target)
//        })

      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.ball.drop(target);
        });
      },

    },
    computed:{
      getIndex(){
        for(let i=0;i<this.scrollHeight.length;i++){
          let height1=this.scrollHeight[i];
          let height2=this.scrollHeight[i+1];
          console.log(this.scrollY);
          console.log('height1',height1);
          console.log('height2',height2);
          if(!height2||(height2>this.scrollY&&this.scrollY>=height1)){
//            console.log(i)
            return i
          }
        }
        return 0
      },
      getSelectFood(){
        let selectFood=[];
        this.goods.forEach((food)=>{
          food.foods.forEach((p1)=>{
            if(p1.count&&p1.count>0){
              selectFood.push(p1)
            }
          })
        })
        return selectFood
      }
    },
    components:{
      shopCart,
      cartcontrol,
      productDetails
    }
  }
</script>
