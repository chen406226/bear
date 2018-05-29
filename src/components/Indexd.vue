<template>
  <div class="indexd">
    <img src="static/img/girl.png">
    <p>这是一本可以在某个午后的咖啡馆，或者下班后失眠的夜里翻开的书，你会觉得，我就像你身边的朋友，三言两语碰着杯，一饮而尽有些醉的人。</p>
    <p>故事或许不够美好，好在酒水管饱。我知道，每个人的世界都有不同，但这些故事里的世界，一定是你似曾相识又触摸不到的另一面，它就像夜里的酒，早上的花儿，平淡又真实，美好又残酷。</p>
    <p class="tc pt">愿我们的故事绿水长流~</p>
    <p class="tc">敬你的孤独择日而终!</p>
    <p><span>已浏览人次</span><span>{{count}}</span><span>已注册人次</span><span>{{regcount}}</span></p>
    <!-- <mt-cell to="/hello" is-link>酒已酿好，等你来听</mt-cell> -->
    <p @click="sdff">你好</p>
    <!-- <form action="http://localhost:8888/upload/jpg" method="post" enctype="multipart/form-data">  
        <input type="file" name="file"/>  
        <input type="submit" value="ok"/>  
    </form>  -->
    <form ref="formfile" action="/upload/jpg" method="post" encType="multipart/form-data"  >
      <p>
        <input type="file" name="avatar" />
      </p>
      <p @click='loadform'>
        确认上传
      </p>
      <p ref="link"></p>
    </form>
  </div>
</template>

<script>
import api from '../axios.js'
// import axios from 'axios.js'
export default {
  data(){
    return {
      users: '',
      haha:'ssdfdf<a href="http://www.baidu.com">lai</a><img src="static/img/girl.png" />sdf'
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
  computed:{
    count(){
      return this.$store.getters.count
    },
    regcount(){
      return this.$store.getters.regcount
    },
  },
  mounted(){
    this.$refs.link.innerHTML = this.haha
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
    async loadform(){
      const formData=new FormData(this.$refs.formfile)
      const res = await fetch('http://localhost:8888/upload/jpg',{
        method:"POST",
        headers:{
          "Access-Control-Allow-Origin":"*"
        },
        body:formData
      }).then((data)=>{return data.json()})
      // const dizhi = res.filename
      this.$message({
        tyep:'success',
        message:res.success
      })
      // axios.post(,formData)
      // api.Uploadfile(formData).then(response => {
      //       console.log(response);
      //       this.$message({
      //         tyep:'success',
      //         message:'上传'
      //       })
      //     }).catch((err)=>{console.log(err)})
      
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
      // api.CreateMusic({
      //   id:400162138,
      //   create_user: '172221516',
      //   createtext:'西风李',
      //   songinfo: {
      //       id:400162138,
      //       artistname:'Beyond',
      //       slbumname:'华纳23周年几年精选系列'
      //   },
      // }).then(response => {
      //     console.log(response);
      //     this.$message({
      //       tyep:'success',
      //       message:'添加成功'
      //     })
      //   }).catch((err)=>{console.log(err)})


        api.AddMusicComment({
          username:'451969599',
          text:'说的太好了',
          id:400162138,
        }).then(response => {
            console.log(response);
            this.$message({
              tyep:'success',
              message:'评论成功'
            })
          }).catch((err)=>{console.log(err)})

      // api.Infos()
      //   .then(response => {
      //     console.log(response);

      //     this.$message({
      //       type: 'success',
      //       message: '删除成功'
      //     });
      //   }).catch((err) => {
      //     console.log(err);
      //   })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexd{
  font-size: 14px;
  padding: 0.5rem 0.3rem;
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
