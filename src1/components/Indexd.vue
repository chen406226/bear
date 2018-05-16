<template>
  <div class="indexd">
    <img src="static/img/girl.png">
    <p>这是一本可以在某个午后的咖啡馆，或者下班后失眠的夜里翻开的书，你会觉得，我就像你身边的朋友，三言两语碰着杯，一饮而尽有些醉的人。</p>
    <p>故事或许不够美好，好在酒水管饱。我知道，每个人的世界都有不同，但这些故事里的世界，一定是你似曾相识又触摸不到的另一面，它就像夜里的酒，早上的花儿，平淡又真实，美好又残酷。</p>
    <p class="tc pt">愿我们的故事绿水长流~</p>
    <p class="tc">敬你的孤独择日而终!</p>
    <mt-cell to="/hello" is-link>酒已酿好，等你来听</mt-cell>
    <p @click="sdff">你好</p>
  </div>
</template>

<script>
import api from '../axios.js'
import axios from 'axios'
export default {
  data(){
    return {
      users: ''
    }
  },
  created(){
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
    del_user(index, event){
      let opt = {
        id: this.users[index]._id
      };
      api.delUser(opt)
        .then(response => {
          console.log(response);

          this.$message({
            type: 'success',
            message: '删除成功'
          });
          //移除节点
          this.users.splice(index, 1);
        }).catch((err) => {
          console.log(err);
        })
    },
    logout() {
      //清除token
      this.$store.dispatch('UserLogout');
      if (!this.$store.state.token) {
          this.$router.push('/login')
          this.$message({
              type: 'success',
              message: '登出成功'
          })
      } else {
          this.$message({
              type: 'info',
              message: '登出失败'
          })
      }
    },
    sdff(){
      console.log(3434)
      api.Infos()
        .then(response => {
          console.log(response);

          this.$message({
            type: 'success',
            message: '删除成功'
          });
          //移除节点
        }).catch((err) => {
          console.log(err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexd{
  font-size: 14px;
  img{
    width: 4rem;
    height: auto;
    float: left;
  }
  p{
    line-height: 20px;
    text-align: left;
    text-indent: 2em;
    word-wrap: break-all;
  }
  .tc{
    text-align: center;
    text-indent: 0;
  }
  .pt{
    padding-top: 0.5rem;
  }
}
</style>
