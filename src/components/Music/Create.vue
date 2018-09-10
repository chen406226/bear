<template>
  <div class="createmusic">
    
    <div class="header">
      <mt-search class="search" v-model="songname" cancel-text="取消" placeholder="输入歌曲搜索并选择"></mt-search>
      <mt-button class="searchbtn" @click="searchsong" type="primary">搜索</mt-button>
    </div>
    <div class="songlist" v-if="musiclist.length>0">
      <h4>{{songname}}</h4>
      <ul class="scroll">
        <li v-for="item in musiclist">
          <div class="info">
            <p :style="{color:'#0c73c2'}">{{item.artists[0].name}}<span :style='{color:"#ea2000",fontSize:"14px",marginLeft:"15px"}'>{{item.name}}</span></p>
            <p :style="{color:'#aaa'}">{{item.album.name}}</p>
          </div>
          <div class="handle">
            <p v-if="playing()&&musicid()==item.id" class="iconfont icon-pause-20" @click="pausesong" ></p>
            <p v-else class="iconfont icon-bofang" @click="playsong(item.id)" ></p>
            <p v-if="selectsong&&songid==item.id" class="selectbtn" @click="delselect">已选</p>
            <p v-else class="selectbtn" @click="select(item)">选择</p>
          </div>
        </li>
      </ul>
      <div >
        <!-- <audio ref="audio" @ended="playend" :src="'http://music.163.com/song/media/outer/url?id='+songid+'.mp3'"></audio> -->
      </div>
    </div>
    <!-- <div class="txt" v-if="selectsong">
      <textarea @input="input" ref='textarea' placeholder="说点什么吧！" autosize v-model="txt"></textarea>
      <div></div>
    </div> -->
    <section>
      <CkEditor :content="content" @change="updateData" :height="500"></CkEditor>
    </section>
    <!-- <audio autoplay :src="'http://music.163.com/song/media/outer/url?id='+447925066+'.mp3'"></audio> -->
    <!-- <div class="footer">
      <div class="canel" @click="cancel">
        返回
      </div>
      <div class="ok" @click="ok">
        确定
      </div>
    </div> -->
    <Drag :click="ok" text='提交'></Drag>

  </div>
</template>

<script>
import api from '../../axios.js'
import axios from 'axios'
import Drag from '../../common/Drag.vue'
import {mapGetters, mapActions} from 'vuex'
import {CkEditor} from '../../ck-editor.js'
var Cd = new CkEditor({name:'ck-editor'}) //局部注册要

export default {
  data(){
    return {
      users: '',
      musiclist:[],
      songname:'',
      selectsong:false,
      songid:null,
      content: "<h3>我有酒你有故事吗&nbsp;&nbsp;&nbsp;&nbsp;^_^</h3>",
      // playing:false,
      item:{},
      txt:'',
    }
  },
  components:{
    Drag,CkEditor:Cd
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
  methods: {
    ...mapGetters([
        'musicid','playing'
      ]),
    ...mapActions([
        'showMsg',
    ]),
    updateData(e){
      this.txt = e;
    },
    async getmusic(name){
      const res = await axios.get('http://musicapi.leanapp.cn/search?keywords='+name)
      if (res.data.result.songCount<1) {
        this.showMsg('sorry！no resource!')      
        return ;  
      }
      this.musiclist=res.data.result.songs
    },
    searchsong(){
      if (!this.songname) {
        this.showMsg('请输入歌曲名称查找')
        return ;
      }
      this.selectsong = false;
      this.getmusic(this.songname)
    },
    playsong(id){
      this.songid = id;
      this.$store.dispatch('MusicId',id)
      setTimeout(()=>{
        // this.playing = true;
        this.$store.commit("PLAY",true)
        this.$store.state.ele.play()
        // this.$refs.audio.play()
      },10)
    },
    pausesong(){
      // this.playing = false;
      this.$store.commit("PLAY",false)
      this.$store.state.ele.pause()
    },
    select(item){
      this.selectsong = true;
      this.item = item;
      this.songid = item.id;
    },
    playend(){
      // this.playing = false;
    },
    delselect(){
      this.selectsong = false;
      this.item = {}
    },
    input(e){
      e.target.style.height = e.target.scrollHeight + "px"
    },
    cancel(){
      window.history.back();
    },
    async ok(){
      if (!this.item.id||!this.txt) {
        return;
      }
      const params = {
        id:this.item.id,
        create_user:sessionStorage.getItem('username'),
        createtext:this.txt,
        songinfo:{
          name:this.item.name,
          artistname:this.item.artists[0].name,
          slbumname:this.item.album.name,
        }
      }

      const res = await api.CreateMusic(params);
      this.showMsg(res.mes)
      this.$router.push('/music')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.createmusic{
  font-size: 16px;
  position: relative;

  .songlist{
    // position: absolute;
    // z-index: 99999999;
    width: 7.5rem;
    text-align: left;
    .scroll{
      height: 5rem;
      overflow-y: scroll;
      border-top: 1px dashed #ccc;
      border-bottom: 1px dashed #ccc;
    }
    h4{
      text-align: center;
      line-height: 0.8rem;
    }
    ul{
      padding-left: 0.1rem;
      li{
        // height: 0.8rem;
        line-height: .5rem;
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 0.2rem 0;
        .info{
          flex: 1;
          overflow: hidden;
        }
        .handle{
          width: 2rem;
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
    }
  }
  .header{
    width: 100%;
    display: flex;
    height: 44px;
    position: relative;
    .search{
      width: 6rem;
      height: 44px;
    }
    .searchbtn{
      width: 1.5rem;
      height: 44px;
    }
  }
  .txt{
    width: 7.5rem;
    textarea{
      padding: 0.2rem 0.3rem;
      height:0.7rem;
      width: 7.5rem;
    }
    div{
      height: 0.8rem;
    }
  }
  .footer{
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
