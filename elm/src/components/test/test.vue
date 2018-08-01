<template>
<div>
  <div v-for="item in test.ary">{{item}}</div>
</div>
</template>
<style>

</style>
<script>
export default {
  props:{
    test:{
      type:Object
    }
  }
}
</script>
