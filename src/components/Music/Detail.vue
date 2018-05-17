<template>
  <div class="ji">
     <div class="bg">
      <img src="static/img/musicbg.jpg">
    </div>
  </div>
</template>

<script>
import api from '../../axios.js'
import {getParam} from '../../handle/fun.js'
  export default {
    data(){
      return {
        id:null,
        data:{}
      }
    },
    created(){

    },
    mounted(){
      const id = getParam(window.location.href, 'id')
      this.id = id;
      this.getMusic({id})
      
    },
    methods:{
      async getMusic(pa){
        const data = await api.DetailMusic(pa)
        this.data = data;
      }
    }
  }
</script>

<style lang="less" scoped>
.ji{
  width:7.5rem;
  .bg{
    width:7.5rem;
    img{
      width:100%;
    }
  }  
}
</style>