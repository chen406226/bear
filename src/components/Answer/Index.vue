<template>
  <div class="answerindex">
    <div v-for="item in datas" >
      <div @touchstart="jump(item._id)">
        <p>{{item.create_user}}</p>
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import api from '../../axios.js'
import moment from 'moment'


export default {
  data(){
    return {
      datas:[{
        create_user:'ck',
        title:'chrome',
        
      }]
    }
  },
  methods:{
    async getdata(){
      const data = await api.GetQuest({page:1,pagesize:10})
      this.datas = data.result
    },
    time(d){
      return moment(d).format('YYYY-MM-DD hh:mm')
    },
    jump(id){
      this.$router.push({path:'/answer/detail',query:{id}})
    },
  },
  mounted(){
    this.getdata()
  }
}
</script>
<style lang="less" scoped>

</style>