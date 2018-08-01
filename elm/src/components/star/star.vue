<template>
<div :class="starNum" class="star">
  <span v-for="item in addClassName" :class="item" class="star_item"></span>
</div>
</template>
<style lang="less">
@import "../../common/less/star.less";
</style>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
  props:['grade'],
computed:{
    starNum(){
      return 'star_'+this.grade;
    },
    addClassName(){
      let result=[];
      let grade=Math.floor(this.grade*2)/2;
      let int=parseInt(grade/1);
      let float=grade%1
      for(let i=0;i<int;i++ ){
        result.push(CLS_ON)
      }
      if(float){
        result.push(CLS_HALF)
      }
      while (result.length<LENGTH){
        result.push(CLS_OFF)
      }
      return result
    }
}
}
</script>
