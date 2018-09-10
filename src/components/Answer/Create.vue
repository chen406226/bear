<template>
  <div class="createanswer">
    <header>
      <div class="flex">
        <span class="answerwenti">问答主题：</span>
        <input class="form-control" maxlength="20" type="text" v-model="theme" name="" id="">
      </div>
    </header>
    <section>
      <div class="answercon" v-for="(item,index) in issues">
        <p>第{{index}}题</p>
        <div class="flex">
          <span class="answerwenti">问题：</span>
          <input class="form-control flex1" type="text" v-model="issues[index].issue" name="" id="">
        </div>
        <div class="flex">
          <span class="answerwenti">A：</span>
          <input class="form-control flex1" type="text" v-model="issues[index].a" name="" id="">
        </div>
        <div class="flex">
          <span class="answerwenti">B：</span>
          <input class="form-control flex1" type="text" v-model="issues[index].b" name="" id="">
        </div>
        <div class="flex">
          <span class="answerwenti">C：</span>
          <input class="form-control flex1" type="text" v-model="issues[index].c" name="" id="">
        </div>
        <div class="flex">
          <span class="answerwenti">得分顺序：</span>
          <input class="form-control flex1" maxlength="3" @blur="blurpt(issues[index].order)" type="text" v-model="issues[index].order" placeholder="请大写如C>B>A填入CBA" name="" id="">
        </div>
      </div>

    </section>
    <footer>
      <button class="btn btn-primary" @touchstart="add"> + </button>
      <button class="btn btn-primary" @touchstart="submit">提交</button>

    </footer>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import api from '../../axios.js'

export default {
  data(){
    return {
      theme:'',
      issues:[{
        issue:'',
        a:'',
        b:'',
        c:'',
        order:''
      }]
    } 
  },
  methods:{
    ...mapActions([
      'showMsg',
    ]),
    blurpt(e){
      if (e.indexOf('A')!=-1&&e.indexOf('B')!=-1&&e.indexOf('C')!=-1) {
          
      }else{
        this.showMsg('请按要求输入')
      }
    },
    add(){
      const mm = JSON.parse(JSON.stringify(this.issues))
      mm.push({issue:'',
        a:'',
        b:'',
        c:'',
        order:''})
      this.issues =mm 
    },
    async submit(){
      const params = {
        issues:this.issues,
        createuser:sessionStorage.getItem('username'),
        title:this.theme,
      }

      const res = await api.CreateQuest(params);
      this.showMsg(res.mes)
      // window.reload()
      // this.$router.push('/music')
    }
  }
}
</script>
<style lang="less" scoped>
.createanswer{
  font-size: 12px;
  .answercon {
    padding: .2rem .2rem;
    background-color: #4c857d;
    margin: .2rem 0;
  }
  .answerwenti{
    width: 70px;
    padding-top: 5px;
    text-align: right;
  }
  .flex {
    display: flex;
  }
  .flex1{
    flex: 1;
  }
}

.form-control {
    display: block;
    width: 80%;
    padding: .1rem .2rem;
    // font-size: 1rem;
    // line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 2px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .2rem .3rem;
    // font-size: 1rem;
    // line-height: 1.5;
    border-radius: .1rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
