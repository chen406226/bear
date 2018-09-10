<template>
  <div class="answerdetail">
    <h3>{{title}}<i style="font-size:10px;">{{time}}</i></h3>
    <header>
      <div class="answercon" v-for="(item,index) in issues">
        <p>第{{index+1}}题  ： <span v-text="item.issue"></span></p>
        <div class="textalignleft">
          <p>A:
            <label :for="'wta'+index">
              <input type="radio" :id="'wta'+index" :checked="'A'+index==checks[index]" @click="changese('A'+index,index)" :name="'wt'+index"/>
              {{item.a}}
            </label>
          </p>
          <p>B:
            <label :for="'wtb'+index">
              <input type="radio" :id="'wtb'+index" :checked="'B'+index==checks[index]" @click="changese('B'+index,index)" :name="'wt'+index"/>
              {{item.b}}
            </label>
          </p>
          <p>C:
            <label :for="'wtc'+index">
              <input type="radio" :id="'wtc'+index" :checked="'C'+index==checks[index]" @click="changese('C'+index,index)" :name="'wt'+index"/>
              {{item.c}}
            </label>
          </p>
        </div>
      </div>
    </header>
    <section>
      <button @click="test">提交</button>
    </section>
  </div>
</template>
<script>

import {mapGetters, mapActions} from 'vuex'
import api from '../../axios.js'
import moment from 'moment'


export default {
  data(){
    return {
      id:null,
      checks:[],
      checkeds:[],
      time:'',
      title:'',
      issues:[{
        issue:'你爱我吗',
        a:'是的',
        b:'是的是的',
        c:'是的是的是的',
        order:'ABC'
      }]
    }
  },
  methods:{
    async getdata(_id){
      const res = await api.DetailQuest({_id})
      this.title = res.data.title
      this.time = moment(res.data.create_time).format('YYYY-MM-DD hh:mm').slice(0,10)
      this.issues = res.data.issues

      this.checks = new Array(this.issues.length).fill('D');
    },
    changese(e,d){
      this.checks[d]=e
    },
    async test(){
      if (this.checks.includes('D')) {
        alert('请选择')
        return;
      }
      this.checkeds = this.checks.map(item => item[0]);
      var cardinal = 100/this.checks.length;
      var sum = 0;
      for (let i = 0; i < this.checks.length; i++) {
        const select = this.checkeds[i];
        const coll = this.issues[i].order
        const scoreidx = 2 - coll.indexOf(select)
        const score = cardinal*scoreidx/2
        sum+=score
      }

      let param = {
        _id:this.id,
        user:sessionStorage.getItem('username'),
        answer:this.checkeds.join(''),
        score:sum,
      }
      const m = await api.Addanswer(param)
      alert(sum)

    }
  },
  mounted(){
    this.id = this.$route.query.id;
    this.getdata({_id:this.id})
  }
}
</script>
<style lang="less" scoped>
  .answercon {
    padding: .2rem .2rem;
    background-color: #4c857d;
    margin: .2rem 0;
  }
label {
  font-size: 14px;
  line-height: 18px;
}
.answerdetail{
  font-size: 14px;
}
.textalignleft{
  text-align: left;
}
</style>