<template>
  <div>
    <div class="header">
      <img src="static/img/persons.png">
      <a name="ppp"></a>
    </div>
    <p id='sd'>hello world</p>
    <!-- <p>{{path}}</p> -->
    <router-link to="/biography/detail">你好</router-link>
    <div>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
    </div>
    <a name='biography/#maodian'>656545</a>
    <p id="sdf">;lsj;kfj;</p>
    <div>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
      <p>65454</p>
    </div>

  </div>
</template>

<script>
import {getParam,jumpmaodian} from '../../handle/fun.js'
  export default {
    name:'biography',
    data(){
      return {
        path:'/biography/detail'
      }
    },
    mounted(){
      const id = getParam(window.location.href, 'id')
      if (id) {
        jumpmaodian(id)
      }
      console.log(id)
    }
  }
</script>

<style scoped lang="less">
  .header{
    overflow:hidden;    
    img{
      width: 100%;
    }
  }
</style>