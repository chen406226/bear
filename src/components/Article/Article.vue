<template>
  <div class="indexd">
    <Head></Head>
    <!-- <ul
    ref="scrolls"
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
  <li v-for="item in list">{{item}}</li>
</ul> -->
  <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul ref="scrolls">
      <li v-for="item in list" @click="jump(item._id)">
        <div class="cont">

        </div>
        <p>ni</p>
        {{ item }}</li>
    </ul>
  </mt-loadmore>
    <div style="border:1px solid red;marginTop:0.5rem;width:3rem;height:3rem;" ref='cutu'>
      <img style="display:block;border:1px solid red" src="static/img/girl.png" /></div>
  </div>
</template>

<script>
import Head from '../../common/Head.vue'
import api from '../../axios.js'

export default {
  data(){
    return {
      page:1,
      pageSize:10,
      haha:'ssdfdf<a href="www.baidu.com">lai</a>sdf',
      list:[1,2,3],
      loading:false,
      allLoaded:false,
    }
  },
  created(){
    // api.getUser().then((response) => {
    //   if(response.status === 401){
    //     this.$router.push('/login');
    //     //可以把无效的token清楚掉
    //     this.$store.dispatch('UserLogout');
    //   }else{
    //     this.users = response.data.result;
    //   }
    // });
  },
  mounted(){
    this.ResizeImages()
    // this.$refs.scrolls.childNodes[0].childNodes[0].innerHTML = 'ck'
    // console.log(this.$refs.scrolls.childNodes[0])

  },
  components:{
    Head
  },
  methods: {
    loadMore() {
      this.allLoaded = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.$refs.loadmore.onBottomLoaded();
        this.allLoaded = false;
      }, 1500);
      console.log(23)
    },
    ResizeImages() {
      var imgs = this.$refs.cutu.getElementsByTagName('img')
      var myimg,oldwidth,oldheight;
      var maxwidth=128;
      var maxheight=128;
      for(var i=0;i<imgs.length;i++){
        myimg = imgs[i];
        if(myimg.width > myimg.height) {
          imgs[i].style.width = '100%';
          imgs[i].style.height = 'auto';
        }else{
            imgs[i].style.height = '100%';
          imgs[i].style.width = 'auto';
        }
      }
    },
    async getlist() {
      this.allLoaded = true;      
      const res = await api.GetArticle(params)
      this.list=this.list.concat(res.result)
      this.$refs.loadmore.onBottomLoaded();
      this.allLoaded = false;            
      console.log(res)
    },
    jump(_id){
      this.$router.push({path:'/article/detail',query:{_id}})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexd{
  padding-top: 0.5rem;
  font-size: 14px;
}
</style>
