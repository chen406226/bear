<template>
  <div class="answerdetail">
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
export default {
  data(){
    return {
      theme:'套路吃什么',
      checks:[],
      checkeds:[],
      issues:[{
        issue:'早晨吃什么',
        a:'是的',
        b:'布加迪沙发客',
        c:'阿什顿发的',
        order:'ABC'
      },{
        issue:'早晨吃什么',
        a:'是的',
        b:'布加迪沙发客',
        c:'阿什顿发的',
        order:'BAC'
      }]
    }
  },
  methods:{
    changese(e,d){
      console.log(e)
      this.checks[d]=e
    },
    test(){
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
        console.log(coll,select)
        const score = cardinal*scoreidx/2
        sum+=score
      }
      alert(sum)
    }
  },
  mounted(){
    this.checks = new Array(this.issues.length).fill('D')
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