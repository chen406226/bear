<template>
  <div id="app">
    <router-view></router-view>
    <audio ref="audio" @ended="playend" :src="'http://music.163.com/song/media/outer/url?id='+musicid()+'.mp3'"></audio>
    <Msg></Msg>
    <transition name="bar">
      <Dir v-if="dir()"  ></Dir>
    </transition> 
  </div>
</template>

<script>
import Msg from './common/Msg.vue'
import api from './axios.js'
import Dir from './common/Dir.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  methods: {
      ...mapGetters([
        'dir','musicid'
      ]),
      playend(){

      },
      resize_font() {
        let deviceWidth = document.documentElement.clientWidth;
        // if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
      },
      async getcount(){
        const res =await api.getCount()
        if (res.success) {
          this.$store.commit('COUNT',res.count)
          this.$store.commit('REGCOUNT',res.regcount)
        }
      }
    },
    mounted() {
      // this.$refs.audio.play()
      this.$store.commit("ELE",this.$refs.audio)
      console.log(this.dir())
      this.resize_font()
      this.getcount()
    },
    components: {
      Msg,Dir
    }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
