<template>
  <div class="answerdetail">
    <header>
      <div class="answercon" v-for="(item,index) in issues">
        <p>第{{index+1}}题  ： <span v-text="item.issue"></span></p>
        <div class="textalignleft">
          <p>A:
            <label :for="'wta'+index">
              <input type="radio" :id="'wta'+index" :checked="'wta'+index==checks[index]" @click="changese('wta'+index,index)" :name="'wt'+index"/>
              {{item.a}}
            </label>
          </p>
          <p>B:
            <label :for="'wtb'+index">
              <input type="radio" :id="'wtb'+index" :checked="'wtb'+index==checks[index]" @click="changese('wtb'+index,index)" :name="'wt'+index"/>
              {{item.b}}
            </label>
          </p>
          <p>C:
            <label :for="'wtc'+index">
              <input type="radio" :id="'wtc'+index" :checked="'wtc'+index==checks[index]" @click="changese('wtc'+index,index)" :name="'wt'+index"/>
              {{item.c}}
            </label>
          </p>
        </div>
      </div>
    </header>
    <section>

    </section>
  </div>
</template>
<script>
export default {
  data(){
    return {
      theme:'套路吃什么',
      checks:[0,1],
      issues:[{
        issue:'早晨吃什么',
        a:'是的',
        b:'布加迪沙发客',
        c:'阿什顿发的',
        order:'阿撒地方'
      },{
        issue:'早晨吃什么',
        a:'是的',
        b:'布加迪沙发客',
        c:'阿什顿发的',
        order:'阿撒地方'
      }]
    }
  },
  methods:{
    changese(e,d){
      console.log(e)
      this.checks[d]=e
    }
  },
  mounted(){

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