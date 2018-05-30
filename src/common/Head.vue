<template>
<div class="nav-header">
  <header>
    <i class="iconfont icon-caidan" @click="showdir"></i>
    <a href="#/my" class="avatar" ></a>
  </header>
</div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: 'msg',
        methods: {
            showdir(){
              this.$store.commit("CHANGEDIR",true)
            }
        },
        computed: {
            ...mapGetters([
                'msg'
            ])
        },

    }
</script>
<style lang="less" scoped>
  .nav-header{
    width: 100%;
    header{
      display:flex;
      width: 100%;
      height: 0.6rem;
      box-sizing: border-box;
      padding: 0 0.2rem;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      position: relative;
      z-index: 99999999999999;
      i{
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        font-size: 0.6rem;
      }
      .avatar{
        width: 0.5rem;
        height: 0.5rem;
        background: url('../../static/img/avatar.png') no-repeat right;
        background-size: 100%;
      }
      .brand{
        width: 100px;
        height: 40px;
        background: url(http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg) no-repeat left;
        background-size: 100%;
      }
    }
    .swipe{
      // width: 100%;
      height: 170px;
      img{
        width:100%;
      }
    }
      
  }
</style>