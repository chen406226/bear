<template>
  <div>
    <header>
      <div class="shadow"></div>
      <div class="header">
        <div class="infot">
          <div class="avatar">
            <img v-if="avatar" v-cloak @click="cancel" :src="'static/avatar/'+avatar" :style="{borderRadius:'50%'}" />
            <img v-else src="static/img/default.jpg" :style="{borderRadius:'50%'}" />
          </div>
        </div>
        <div class="info">
          <h3>{{username}}</h3>
          <p>个性签名</p>
          <!-- <p v-html="mm"></p> -->
          <div v-cloak v-if="!inputing" class="oo">
            <cite @click="changeinput(true)">{{signature||'这个家伙很懒'}}</cite>
          </div>
          
          <textarea v-else @blur="savesign" maxlength="50" cols="25" rows="4" :placeholder="signature+'(小于50字，触摸输入框外部保存)'" type="text"/>
        </div>
      </div>
      <!-- <div class="fot">

      </div> -->
    </header>
    <section>
      <!-- <router-link tag='li' to="/music" class="link">
        <span class="mes">消息</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link> -->
      <router-link tag='li' to="/my" class="link black">
        <span class="mes">与我相关</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link>
      <router-link tag='li' to="/my/music" class="link">
        <span class="mes">我发起的音乐专题</span>
        <!-- <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}"> -->
        <!-- <span class="count">+3</span> -->
        <img src="static/img/arrow.png" alt="" :style="{marginLeft:'2.4rem',height:'0.4rem',width:'0.4rem'}">
      </router-link>
      <!-- <router-link tag='li' to="/music" class="link">
        <span class="mes">我发起的图文专题</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link> -->
    </section>
    <div class="logout">
      <mt-button type="danger" @click="logout">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import api from '../../axios.js'

  export default {
    data(){
      return {
        avatar:sessionStorage.getItem('avatar'),
        username:sessionStorage.getItem('username'),
        signature:sessionStorage.getItem('signature')||'这个人很懒什么都没留下！',
        inputing:false,
        mm:'<span>你好</span>'
      }
    },
    mounted(){
      if (sessionStorage.getItem('avatar')!=sessionStorage.getItem('username')+'.jpg') {
        this.avatar = "dog2.png"
      }
    },
    methods:{
      savesign(e){
        this.changeinfo(e.target.value)
      },
      async changeinfo(data){
        const res = await api.UpdateUser({
          username:sessionStorage.getItem('username'),
          key:'signature',
          value:data
        })
        if (res.success) {
          sessionStorage.setItem('signature',data)   
          this.signature = data
          setTimeout(()=>{
            this.$router.push('/my')
          },200)
        }
        setTimeout(() => {
          this.inputing = false
        }, 200);
      },
      changeinput(v){
        this.inputing = v
      },
      logout() {
        //清除token
        this.$store.dispatch('UserLogout');
        if (!this.$store.state.token) {
            this.$router.push('/music')
            this.$message({
                type: 'success',
                message: '退出成功'
            })
        } else {
            this.$message({
                type: 'info',
                message: '退出失败'
            })
        }
      },
      cancel() {
        this.$router.push({path:'/my/amend',query:{url:this.avatar,username:this.username}})
      }
    },
  }
</script>

<style scoped lang="less">
header{
  font-size: 16px;
  // position: relative;
  width: 7.5rem;
  background: url('../../../static/img/car.png') no-repeat;
  opacity: 0.9;
  background-size: 100% auto;
  height: 4.8rem;
  .shadow{
     opacity: .6;
    background-color: #000;    
    width: 7.5rem;
    height: 4.8rem;
  }
  .header{
    position: absolute;
    left: 0;
    top: 0;
   
    display: flex;
    height: 2.5rem;
    .infot{
      .avatar{
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.5rem;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content:center;
        align-items:center;
        img{
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
    .info{
      width: 5rem;
      color: #fff;
      padding-top: .5rem;
      text-align: left;
      height: 2.5rem;
      h3{
        color: aquamarine;
      }
      .oo{
        // overflow: hidden;
        // word-break: break-all;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // text-overflow: ellipsis;
        // -webkit-line-clamp: 3;
        // position: relative;
        // line-height: 1.4em;
        height: 3.8rem;
        padding-right: .3rem;
        cite{
          font-size: .24rem;
          text-indent: 2em;
          color: antiquewhite;
        }
        // &::after{
        //   content: '...';
        //   font-weight: bold;
        //   position: absolute;
        //   bottom: 0;
        //   right: 0;
        //   padding: 0 20px 0 40px;
        //   background-color: #eee;
        //   background: -webkit-linear-gradient(left,rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 50%,rgba(0,0,0,.6) 100%);
        // }
      }
    }
  }
  .fot{
    height: 2.3rem;
  }
  .logout{
    position: fixed;
    bottom: 0;

  }
}
section{
  font-size: 16px;
  border-top: 0.2rem solid #ddd;
  .black{
    background-color: #ccc;
  }
  li{
    list-style: none;
    display: flex;
    align-items:center;
    text-align: left;
  }
  .link{
    height: 1rem;
    line-height: 1rem;
    margin-left: 0.2rem;
    border-bottom: 1px solid #ccc;
    .mes{
      width: 4rem;
    }
    .count{
      width: 2rem;
      color:#ea2000;
    }
  }
}

</style>