<template>
  <div>
    <header>
      <div class="infot">
        <div class="avatar">
          <img v-if="avatar" :src="'static/img/'+avatar" :style="{borderRadius:'50%'}" />
          <img v-else src="static/img/default.jpg" :style="{borderRadius:'50%'}" />
        </div>

      </div>
      <div class="info">
        <p>{{username}}</p>
        <p>个性签名 ： {{signature}}</p>
      </div>
    </header>
    <section>
      <router-link tag='li' to="/music" class="link">
        <span class="mes">消息</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link>
      <router-link tag='li' to="/music" class="link">
        <span class="mes">与我相关</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link>
      <router-link tag='li' to="/music" class="link">
        <span class="mes">我发起的音乐专题</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link>
      <router-link tag='li' to="/music" class="link">
        <span class="mes">我发起的图文专题</span>
        <img src="static/img/comment.png" :style="{height:'0.4rem',width:'0.4rem'}">
        <span class="count">+3</span>
        <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
      </router-link>
    </section>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        avatar:'aa3.jpg',
        username:'saka',
        signature:''
      }
    }
  }
</script>

<style scoped lang="less">
header{
  font-size: 16px;
  
  width: 7.5rem;
  background: url('../../../static/img/car.png') no-repeat;
  opacity: 0.9;
  background-size: 100% auto;
  display: flex;
  height: 4.8rem;
  .infot{
    opacity: .6;
    background-color: #fff;    
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
    opacity: .6;
    background-color: #fff;
  }
}
section{
  font-size: 16px;
  border-top: 0.2rem solid #ddd;
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