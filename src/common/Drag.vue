<template>
  <div class="add" ref="shownav">
      <img width="50" height="50" :src="dog" style="display:block" alt="">
      <span>{{text}}</span>
  </div>
</template>

<script>
// 下雨了你可能怪他没有出现给你撑伞

  export default {
    data() {
      return {
        txt:'',
        dog:'static/img/dog1.png', //'static/img/dog2.png'
        homexy:{
          x:50,
          y:50,
        },
        move:false
      }
    },
    mounted() {
      this.addevent(this.$refs.shownav)
    },
    props:[
      'click','text'
    ],
    methods:{
      send(){
        console.log('send')
      },
      addevent(e) {
        const fnmove = (d)=>{
          const movex = d.changedTouches[0].clientX - this.homexy.homex ;
          const movey = d.changedTouches[0].clientY - this.homexy.homey;
          // $(e).css({"left":movex,"top":movey})
          e.style.left = movex+'px';
          e.style.top = movey+'px';
          this.move = true;
          // e.removeEventListener("touchend",fnend);
        }
        e.addEventListener('touchstart',(event)=>{
          this.dog = 'static/img/dog2.png';
          this.homexy.homex = event.changedTouches[0].clientX - e.offsetLeft ;
          this.homexy.homey = event.changedTouches[0].clientY - e.offsetTop ;
          // e.addEventListener('touchend',fnend)
          e.addEventListener('touchmove',fnmove)
        },true)
          e.addEventListener('touchend',(e)=>{
            this.dog = 'static/img/dog1.png';       
            if (this.move) {
              this.move = false;
              return ;
            }     
            // this.send()
            this.$props.click()
          })        
      }
    },

  }
</script>

<style lang="less" scoped>
  .txt{
    width: 7.5rem;
    position: relative;
    textarea{
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.2rem 0.3rem;
      height:0.7rem;
      width: 7.5rem;
    }
    div{
      height: 0.8rem;
    }
  }
  .add{
    position: fixed;
    font-size: 10px;
    line-height: 8px;
    color: rgb(201, 175, 140);
    top:200px;
    left: 50px;
    z-index: 9999999999999999;
  }
</style>