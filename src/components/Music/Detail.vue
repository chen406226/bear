<template>
  <div class="ji">
    <div class="bg" v-if="data">
      <div>
        <img :style="{marginLeft:'-1.5rem',width:'0.8rem',height:'0.6rem'}" src="static/img/pen.png">
        <span>作者：{{data.create_user}}</span>
      </div>
      <div class="footer">
        <span :style="{fontSize:'10px',lineHeight:'0.5rem'}">{{time(data.create_time)}}</span>
        <div :style="{float:'right',height:'0.5rem',paddingRight:'0.5rem'}">
          <img src="static/img/comment.png" :style="{height:'0.5rem',width:'0.5rem'}">
          <span :style="{height:'0.5rem',marginBottom:'0.2rem'}">{{data.comment.length}}</span>
        </div>
      </div>
    </div>
    <div v-if="data" :style="{textAlign:'left'}">
      <div class="cont">
        <audio ref="audio" @ended="playend" :src="'http://music.163.com/song/media/outer/url?id='+data.id+'.mp3'"></audio>
        <div class="info">
          <p :style="{color:'#0c73c2'}">{{data.songinfo.artistname}} : <span :style='{color:"#ea2000",fontSize:"14px",marginLeft:"15px"}'>{{data.songinfo.name}}</span></p>
          <p :style="{color:'#aaa'}">{{data.songinfo.slbumname}}</p>
        </div>
        <div class="handle">
          <p v-if="playing" class="iconfont icon-pause-20" @click.stop="pausesong" ></p>
          <p v-else class="iconfont icon-bofang" @click.stop="playsong" ></p>
        </div>
      </div>
      <div class="text">
        <div>
          <p :style="{textIndent:'1em'}">：</p>
          <p :style="{color:'#666',textIndent:'2em'}" class="zi">{{data.createtext}}</p>
        </div>
      </div>
      <div class="comment">
        <ul>
          <li v-for="item in data.comment.reverse()" :key="item.id">
            <div>
              
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../axios.js'
import {getParam} from '../../handle/fun.js'
import moment from 'moment'

  export default {
    data(){
      return {
        id:null,
        data:null,
        playing : false,

      }
    },
    created(){
      console.log()
    },
    mounted(){
      
      // const id = getParam(window.location.href, 'id')
      this.id = this.$route.query.id;
      this.getMusic({id:this.id})
      
    },
    methods:{
      async getMusic(pa){
        const res = await api.DetailMusic(pa)
        this.data = res.data;
      },
      playsong(){
        setTimeout(()=>{
          this.playing = true;
          this.$refs.audio.play()
        },10)
      },
      pausesong(){
        this.playing = false;
        this.$refs.audio.pause()
      },
      playend(){
        this.playsong()
        // this.playing = false;
      },
      time(d){
        return moment(d).format('YYYY-MM-DD hh:mm')
      },
    }
  }
</script>

<style lang="less" scoped>
.ji{
  width:7.5rem;
  font-size: 16px;
  .bg{
    // background: url('/static/img/car.png') no-repeat;
    // background-size: 100% auto;
    // background-color: #ccc;
    width:7.5rem;
    // height: 5rem;
    img{
      width:100%;
    }
    .footer{
      text-align: left;
      text-indent: 2em;
    }
  }  
  .cont{
    // background-color: #ccc;     
    padding: 0.1rem;
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
      border-top: 1px dashed #ddd;
      border-bottom: 0.2rem solid #ccc;
      // background-color: #ccc;
    }
}
</style>