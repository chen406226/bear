<template>
  <div>
    <UploadPhotos :data="list" />
    <div class="txt">
      <textarea @input="input" ref='textarea' placeholder="说点什么吧！" autosize v-model="txt"></textarea>
      <div></div>
    </div>
    <!-- <div class="add" ref="shownav">
        <img width="50" height="50" :src="dog" style="display:block" alt="">
        <span>发表</span>
    </div> -->
    <Drag :click="send" text='发表'></Drag>
  </div>
</template>

<script>
// 下雨了你可能怪他没有出现给你撑伞
import UploadPhotos from '../../common/UploadPhotos.vue'
import Drag from '../../common/Drag.vue'
import {mapActions} from 'vuex'
import api from '../../axios.js'

  export default {
    data() {
      return {
        txt:'',
        dog:'static/img/dog1.png', //'static/img/dog2.png'
        list:{
          string:'无图不言',
          showimg:false,
          imgurl:'',
        },
        homexy:{
          x:50,
          y:50,
        },
        move:false
      }
    },
    mounted() {
      // this.addevent(this.$refs.shownav)
    },
    methods:{
      ...mapActions([
        'showMsg',
      ]),
      input(e){
        e.target.style.height = e.target.scrollHeight + "px"
      },
      async send(){
        if (!this.txt) {
          this.showMsg('说点什么吧');
          return ;
        }
        const params = {
          create_user:'172221516',
          createtext:this.txt,
          url:this.list.imgurl
        }

        const res = await api.CreateArticle(params);
        this.showMsg(res.mes)
      },
      addevent(e) {
        const fnmove = (d)=>{
          const movex = d.changedTouches[0].clientX - this.homexy.homex ;
          const movey = d.changedTouches[0].clientY - this.homexy.homey;
          // $(e).css({"left":movex,"top":movey})
          e.style.left = movex+'px';
          e.style.top = movey+'px';
          this.move = true;
          // e.removeEventListener("touchend",fnend);
        }
        e.addEventListener('touchstart',(event)=>{
          this.dog = 'static/img/dog2.png';
          this.homexy.homex = event.changedTouches[0].clientX - e.offsetLeft ;
          this.homexy.homey = event.changedTouches[0].clientY - e.offsetTop ;
          // e.addEventListener('touchend',fnend)
          e.addEventListener('touchmove',fnmove)
        },true)
          e.addEventListener('touchend',(e)=>{
            this.dog = 'static/img/dog1.png';       
            if (this.move) {
              this.move = false;
              return ;
            }     
            this.send()
          })        
      }
    },
    components:{
      UploadPhotos,Drag
    }
  }
</script>

<style lang="less" scoped>
  .txt{
    width: 7.5rem;
    position: relative;
    textarea{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.2rem 0.3rem;
      height:0.7rem;
      width: 7.5rem;
    }
    div{
      height: 0.8rem;
    }
  }
  .add{
    position: fixed;
    font-size: 10px;
    line-height: 8px;
    color: rgb(201, 175, 140);
    top:200px;
    left: 50px;
    z-index: 9999999999999999;
  }
</style>