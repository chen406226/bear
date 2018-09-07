<template>
  <div class="createanswer">
    <header>
      <h4>创建人</h4>
      <div class="flex">
        <span class="answerwenti">主题概括：</span>
        <input class="form-control" type="text" v-model="theme" name="" id="">
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
          <input class="form-control flex1" type="text" v-model="issues[index].order" placeholder="请大写如C>B>A填入CBA" name="" id="">
        </div>
      </div>

    </section>
    <footer>
      <button class="btn btn-primary" @touchstart="fd"> + </button>
      <button class="btn btn-primary" @touchstart="fd">提交</button>

    </footer>
  </div>
</template>
<script>
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
    fd(){
      const mm = JSON.parse(JSON.stringify(this.issues))
      mm.push({issue:'',
        a:'',
        b:'',
        c:'',
        order:''})
      this.issues =mm 
      console.log(this.issues)
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
