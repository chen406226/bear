<template>
  <div class="indexd">
    <Head></Head>
    <div class="bg">
      <img src="static/img/musicbg.jpg">
      <div class="txtjump">
        <p class="">
          <span class="jump jump1">一</span>
          <span class="jump jump2">首</span>
          <span class="jump jump3">有</span>
          <span class="jump jump4">灵</span>
          <span class="jump jump5">魂</span>
          <span class="jump jump6">的</span>
          <span class="jump jump7">歌</span>
        </p>
      </div>
    </div>
    <div class="content">
      <div >
        <!-- <audio ref="audio" @ended="playend" :src="'http://music.163.com/song/media/outer/url?id='+songid+'.mp3'"></audio> -->
      </div>
      <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul ref="scrolls">
          <li v-for="(item,idx) in musiclist" key="idx" @click="jump(item.id)">
            <div class="cont">
              <div class="info">
                <p :style="{color:'#0c73c2'}">{{item.songinfo.artistname}} : <span :style='{color:"#ea2000",fontSize:"14px",marginLeft:"15px"}'>{{item.songinfo.name}}</span></p>
                <p :style="{color:'#aaa'}">{{item.songinfo.slbumname}}</p>
              </div>
              <div class="handle">
                <p v-if="playing()&&musicid()==item.id" class="iconfont icon-pause-20" @click.stop="pausesong" ></p>
                <p v-else class="iconfont icon-bofang" @click.stop="playsong(item.id)" ></p>
              </div>
            </div>
            <div class="text">
              <div>
                <img class='avatar' :style="{marginLeft:'.5rem',marginBottom:'-.2rem',width:'0.6rem',height:'0.6rem'}" :src="'static/avatar/'+item.create_user+'.jpg'" onerror='javascript:this.src="static/avatar/dog2.png";this.onerror=null'>
                <span>作者：{{item.create_user}}</span>
                <img :style="{marginLeft:'.5rem',width:'0.8rem',height:'0.6rem'}" src="static/img/pen.png">
              </div>
              <div class="textcon">

              <div :style="{color:'#666'}" class="zi" v-html="item.createtext"></div>
              </div>
            </div>
            <div class="footer">
              <p :style="{fontSize:'10px',lineHeight:'0.5rem',float:'left'}">{{time(item.create_time)}}</p>
              <div :style="{float:'right',height:'0.5rem',paddingRight:'0.5rem'}">
                <img src="static/img/comment.png" :style="{height:'0.5rem'}">
                <span :style="{height:'0.5rem',marginBottom:'0.2rem'}">{{item.comment.length}}</span>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>

      <div>
        
      </div>
    </div>
    <div class="header">
    <!-- <a href="#/biography?id=sdf">dfsdf</a> -->
    <!-- <audio autoplay :src="'http://music.163.com/song/media/outer/url?id='+447925066+'.mp3'"></audio> -->
    </div>
    <!-- <div class="fiexd">
      <div class="canel" @click="cancel">
        返回
      </div>
      <div class="ok" @click="ok">
        添加专题
      </div>
    </div> -->
    <Drag :click="ok" text='创建专题'></Drag>
  </div>
</template>

<script>
import api from '../../axios.js'
import {jumpmaodian} from '../../handle/fun.js'
import Head from '../../common/Head.vue'
import Drag from '../../common/Drag.vue'
import {mapGetters} from 'vuex'
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
      // playing : false,
    }
  },
  created(){
    // this.getlist({
    //   page:this.page,
    //   pageSize:this.pageSize
    // })
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
  components:{
    Head,Drag
  },
  methods: {
    ...mapGetters([
      'musicid','playing'
    ]),
    send(){
      this.ok()
    },
    async getmusic(){
      const res = await axios.get('http://musicapi.leanapp.cn/search?keywords=海阔天空')
      this.musiclist=res.data.result.songs
    },
    maodian(){
      jumpmaodian('sd')
    },
    loadMore() {
      this.allLoaded = true;
      this.page += 1;
      this.getlist({
        page:this.page,
        pageSize:this.pageSize,
      })
      // setTimeout(() => {
      //   let last = this.list[this.list.length - 1];
      //   for (let i = 1; i <= 10; i++) {
      //     this.list.push(last + i);
      //   }
      //   this.$refs.loadmore.onBottomLoaded();
      //   this.allLoaded = false;
      // }, 1500);
      // console.log(23)
    },
    async getlist(params) {
      this.allLoaded = true;      
      const res = await api.GetMusic(params)
      this.musiclist=this.musiclist.concat(res.result)
      this.$refs.loadmore.onBottomLoaded();
      this.allLoaded = false;            
    },
    playsong(id){
      this.songid = id;
      this.$store.dispatch('MusicId',id)
      this.$store.commit('PLAY',true)
      setTimeout(()=>{
        // this.playing = true;
        this.$store.state.ele.play()
        // this.$refs.audio.play()
      },10)
    },
    pausesong(){
      // this.playing = false;
      this.$store.commit('PLAY',false)
      this.$store.state.ele.pause()
    },
    playend(){
      // this.playing = false;
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
  padding-bottom: 0.8rem;
  .bg{
    img{
      width: 100%;
      opacity: .6;
    }
    .txtjump{
      position: absolute;
      box-sizing: border-box;
      top: 0;
      left: 0;
      width: 7.5rem;
      padding: 1.2rem 1rem 0.4rem ;
      font-size: 24px;
      p{
        height: .8rem;
        text-align: center;
      }
    }
  }
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
      .textcon{
        position: relative;
        height: 1.7rem;
        overflow: hidden;

        &::after{
          content: '...';
          font-weight: bold;
          position: absolute;
          height: 1em;
          bottom: 0;
          right: 0;
          padding: 0 20px;
          background-color: #eee;
          background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0%,rgba(238,238,238,1) 50%,rgba(238,238,238,1) 100%);
        }
      }
      .zi{
        // overflow: hidden;
        // word-break: break-all;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // text-overflow: ellipsis;
        // -webkit-line-clamp: 3;
        // position: relative;
        // line-height: 1.4em;
        // height: 4.2em;
        h2{
          font-size: 16px !important;
          text-align: center !important;
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
  .fiexd{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 0.8rem;
    width: 7.5rem;
    display: flex;
    div{
      flex: 1;
      border-top: 1px solid #ccc;
      font-size: 0.5rem;
      color: #ea2000;
      line-height: 0.8rem;
      background-color: #fff;
      &:nth-child(2){
        color: #fff;
        background-color: #ea2000;
      }
    }
  }
}
</style>
