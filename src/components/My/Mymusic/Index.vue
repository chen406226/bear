<template>
  <div class="indexd">
      <Head></Head>
    <div class="content">
      <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul ref="scrolls">
          <li v-for="item in musiclist" @click="jump(item.id)">
            <div class="cont">
              <div class="info">
                <p :style="{color:'#0c73c2'}">{{item.title}}</p>
              </div>
            </div>
            <div class="footer">
              <p :style="{fontSize:'10px',lineHeight:'0.5rem',float:'left'}">{{time(item.create_time)}}</p>
            </div>
          </li>
        </ul>
      </mt-loadmore>

      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../axios.js'
import Head from '../../../common/Head.vue'
import axios from 'axios'
import moment from 'moment'
export default {
  data(){
    return {
      users: '',
      musiclist:[],
      songid:0,
      page:0,
      pageSize:10,
      haha:'ssdfdf<a href="www.baidu.com">lai</a>sdf',
      list:[1,2,3],
      loading:false,
      allLoaded:false,
      playing : false,
    }
  },
  components:{
      Head
  },
  created(){
    this.getlist({username:sessionStorage.getItem('username')})
  },
  methods: {
    send(){
      this.ok()
    },
    loadMore() {
    //   this.allLoaded = true;
    //   this.page += 1;
    //   this.getlist({
    //     page:this.page,
    //     pageSize:this.pageSize,
    //   })
    },
    async getlist(params) {
      this.allLoaded = true;      
      const res = await api.getMymusic(params)
      this.musiclist=this.musiclist.concat(res.result)
      this.$refs.loadmore.onBottomLoaded();
      console.log(this.musiclist)
      this.allLoaded = false;            
      console.log(res)
    },
    playend(){
      this.playing = false;
    },
    time(d){
      return moment(d).format('YYYY-MM-DD hh:mm')
    },
    jump(id){
      this.$router.push({path:'/music/detail',query:{id}})
    },
    cancel(){
      window.history.back();
    },
    ok(){
      this.$router.push('/music/create')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexd{
  font-size: 16px;
  width: 7.5rem;
  padding-top: .8rem;
  padding-bottom: 0.8rem;
  .content{
    padding: 0.1rem;
    text-align: left;
    li{
      background-color: #eee;
      margin-top: 0.2rem;
      padding: 0.1rem;
    }
    .cont{
      display: flex;
      .info{
        flex: 1;
        overflow: hidden;
      }
      .handle{
        width: 1rem;
        display: flex;
        align-items: center;
        text-align: center;
        padding-right: 0.3rem;
        .icon-bofang{
          font-size: 35px;
          flex: 1;
        }
        .icon-pause-20{
          font-size: 35px;
          flex: 1;
        }
        .selectbtn{
          flex: 1;
          
        }
      }
    }
    .text{
      width: 100%;
      p.zi{
        overflow: hidden;
        // word-break: break-all;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // text-overflow: ellipsis;
        // -webkit-line-clamp: 3;
        position: relative;
        line-height: 1.4em;
        height: 4.2em;
        &::after{
          content: '...';
          font-weight: bold;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 0 20px;
          background-color: #eee;
          background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0%,rgba(238,238,238,1) 50%,rgba(238,238,238,1) 100%);
        }
      }
      // box-shadow:0 -12px 5px rgba(255,255,255,1);
    }
    .footer{
      padding-top: 0.2rem;
      height: 0.7rem;
      .comment{

      }
    }
  }
}
</style>
