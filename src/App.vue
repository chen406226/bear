<template>
  <div id="app">
    <router-view></router-view>
    <Msg></Msg>
  </div>
</template>

<script>
import Msg from './common/Msg.vue'
import api from './axios.js'

export default {
  name: 'app',
  methods: {
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
      this.resize_font()
      this.getcount()
    },
    components: {
      Msg
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
