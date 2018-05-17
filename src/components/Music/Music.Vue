<template>
  <div class="indexd">
    <img src="static/img/girl.png">
    <div class="header">
      <audio src=""></audio>
    <ul>
      <li v-for="item in musiclist">
        <span>歌名{{item.name}}</span>  
        <span>歌手{{item.artists[0].name}}</span>  
        <audio :src="'http://music.163.com/song/media/outer/url?id='+item.id+'.mp3'"></audio>
        <!-- <p>{{item.id}}</p> -->
      </li>
    </ul>
    <a href="#/biography?id=sdf">dfsdf</a>
    <audio autoplay :src="'http://music.163.com/song/media/outer/url?id='+447925066+'.mp3'"></audio>
    </div>
  </div>
</template>

<script>
// import api from '../axios.js'
import {jumpmaodian} from '../../handle/fun.js'
import axios from 'axios'
export default {
  data(){
    return {
      users: '',
      musiclist:[]
    }
  },
  created(){
    this.getmusic()
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
    async getmusic(){
      const res = await axios.get('http://musicapi.leanapp.cn/search?keywords=海阔天空')
      console.log(res)
      this.musiclist=res.data.result.songs
    },
    maodian(){
      jumpmaodian('sd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexd{
  font-size: 16px;
}
</style>
