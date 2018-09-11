<template>
  <div class="answerindex">
    <!-- <div v-for="item in datas" >
      <div @touchstart="jump(item._id)">
        <p>{{item.create_user}}</p>
        <p>{{item.title}}</p>
      </div>
    </div> -->
    <p></p>
    <mt-loadmore  :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="scroll" ref="scrolls">
        <li v-for="(item,idx) in datas">
          <div @touchstart="jump(item._id)">
            <p>{{item.create_user}}</p>
            <p>{{item.title}}</p>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import api from '../../axios.js'
import moment from 'moment'


export default {
  data(){
    return {
      allLoaded:false,
      page:1,
      pageSize:10,
      datas:[{
        create_user:'ck',
        title:'chrome',
        
      }]
    }
  },
  methods:{
    loadMore() {
      this.allLoaded = true;
      this.page += 1;
      this.getdata({
        page:this.page,
        pageSize:this.pageSize,
      })
    },
    async getdata(params){
      this.allLoaded = true;      
      const data = await api.GetQuest(params)
      this.datas=this.datas.concat(data.result)
      this.$refs.loadmore.onBottomLoaded();
      this.allLoaded = false;   
    },
    time(d){
      return moment(d).format('YYYY-MM-DD hh:mm')
    },
    jump(id){
      this.$router.push({path:'/answer/detail',query:{id}})
    },
  },
  mounted(){
    this.getdata({page:this.page,pageSize:this.pageSize,})
  }
}
</script>
<style lang="less" scoped>
.answerindex{
  ul{
    li{
      border: 5px dashed cyan;
      border-top: none;
      &:first-child{
        border-top: 5px dashed cyan;
      }
    }
  }
}
</style>