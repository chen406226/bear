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
      <div ref="cont" style="padding:0 0.2rem;">
        <img :src="data.url" alt="">
      </div>
      <div class="text">
        <div>
          <p :style="{textIndent:'1em'}">：</p>
          <p :style="{color:'#666',textIndent:'2em'}" class="zi">{{data.createtext}}</p>
        </div>
      </div>
      <div class="comment">
        <ul>
          <li v-for="item in reverse" :key="item._id">
            <div>
              <p :style="{textAlign:'center'}">
                <span>过客：</span><span>{{item.username}}</span>
                <span style="float:right;">{{time(item.create_time)}}</span>
              </p>
                
            <!-- <span>{{timem(item._id)}}</span> -->
            <p :style="{textIndent:'2em'}">{{item.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="canel" @click="cancel">
        返回
      </div>
      <div class="ok" @click="ok">
        my store
      </div>
    </div> -->
    <Drag :click="ok" text='要发言'></Drag>
    <!-- <mt-popup
      v-model="popupVisible"
      position="right"
      :closeOnClickModal="fs"
    >
      <div class="txt">
        <textarea @input="input" ref='textarea' placeholder="说点什么吧！" autosize v-model="txt"></textarea>
        <div></div>
      </div>
    </mt-popup> -->
    <div ref="pp" class="dialog" v-show="popupVisible">
      <div class="txt">
        <textarea @input="input" ref='textarea' placeholder="说点什么吧！" autosize v-model="txt"></textarea>

      </div>
      <div class="footer">
        <div class="canel" @click="close">
          取消
        </div>
        <div class="ok" @click="submit">
          提交
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../axios.js'
import {getParam} from '../../handle/fun.js'
import {mapGetters, mapActions} from 'vuex'
import Drag from '../../common/Drag.vue'

import moment from 'moment'
import { Indicator } from 'mint-ui';
  export default {
    data(){
      return {
        id:null,
        data:null,
        playing : false,
        popupVisible:false,
        fs:false,
        txt:'',
      }
    },
    created(){
      console.log()
    },
    updated(){
      
    },
    mounted(){
      this.$refs.pp.style.height = window.screen.height + 'px'
      
      // const id = getParam(window.location.href, 'id')
      this._id = this.$route.query._id;
      this.getMusic({_id:this._id})
    },

    methods:{
      ...mapActions([
        'showMsg',
      ]),
      async getMusic(pa){
        Indicator.open('加载中...');
        const res = await api.DetailArticle(pa)
        this.data = res.data;
        Indicator.close();
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
      timem(id){
        // moment(objectIdToTimestamp(id)).format('YYYY-MM-DD HH:mm:ss')
      },
      cancel(){
        window.history.back();
      },
      ok(){
        this.popupVisible = true
      },
      input(e){
        e.target.style.height = e.target.scrollHeight + "px"

      },
      close(){
        this.popupVisible = false        
      },
      submit(){
        if (!this.txt) {
          this.showMsg('请输入!')
          return;                
        }
        this.popupVisible = false
        const par={
          id:this.id,
          username:'451969599',
          text:this.txt
        }
        const res = api.AddMusicComment(par)
        this.showMsg(res.mes)
        this.getMusic({id:this.id})
      }
    },
    computed:{
      reverse(){
        return this.data.comment.reverse()
      }
    }
  }
</script>

<style lang="less" scoped>
.ji{
  width:7.5rem;
  font-size: 16px;
  height: 100%;
    overflow-y: scroll;
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
      border-bottom: 0.2rem solid Purple;
      // background-color: #ccc;
    }
    .comment{
      ul{
        li{
          border-bottom: 0.2rem solid #ccc;
          &:last-child{
            border: 0;
          }          
        }
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
  .txt{
    width: 7.5rem;
    height: 5rem;
    // position: absolute;
    // top: 0;
    // left: 0;
    textarea{
      padding: 0.2rem 0.3rem;
      height:0.7rem;
      width: 7.5rem;
    }
    div{
      height: 0.8rem;
    }
  }
  .dialog{
    position: fixed;
    z-index: 999999999;
    top: 0;
    left: 0;
    background-color: #ddd;
    textarea{
      background-color: #ddd;
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
}
</style>