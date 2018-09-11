<template>
  <div class="dir">
    <div class="dircon">
      <header>
        <h3>导航</h3>
      </header>
      <section>
        <div class="link" @click="haha('music')">
          <span class="mes">音乐</span>
          <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
        </div>
        <!-- <div class="link" @click="haha('article')">
          <span class="mes">图文</span>
          <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
        </div> -->
        <!-- <div class="link" @click="haha('biography')">
          <span class="mes">传记</span>
          <img src="static/img/arrow.png" alt="" :style="{height:'0.4rem',width:'0.4rem'}">
        </div> -->
      </section>
    </div>
    <div class="bg" @click="exitdir" ></div>
  </div>
</template>

<script>
  export default {
    props:['unit','setindex'],
    data(){
      return {
        reverse: false,
        dirlist: []  //获取列表信息给Dir组件使用
      }
    },
    mounted(){
      // $(this.$el).height(window.innerHeight-50);
      // this.getdirlist();
      // const rev = localStorage.getItem('reverse');
      // if (rev) {
      //   this.reverse = rev ;
      // }

    },
    methods:{
      dirreverse(){
        this.reverse = !this.reverse;
        this.dirlist=this.dirlist.reverse();
        localStorage.setItem("reverse",this.reverse)
      },
      haha(path){
        this.$store.commit('CHANGEDIR',false)
        this.$router.push("/"+path)
      },
      exitdir(){
        // this.$props.setindex.showidx = -1;
        this.$store.commit('CHANGEDIR',false)
      },
      async getdirlist(){
        const id = this.$route.params.id;
        const dirlist = await fetch('book/bookdir/'+id).then((res)=>{return res.json()});
        this.dirlist = dirlist.chapter;
      },
      changechapter(n){
        if (n == this.$props.unit.idx) return ;
        this.$props.unit.idx = n ;
        this.exitdir()  //更换章节之后退出目录
      }
    },
    watch:{

    }
  }
</script>
<style lang="less" scoped>
  .dir{
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    height: 100%;
    z-index: 99999999;
    font-size: 16px;
    .dircon{
      flex: 1;
      height: 100%;
      position: relative;
      overflow: hidden;
      background-color: white;
      header{
        width: 6rem;
        overflow: hidden;
        width: 100%;
        height: 50px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid red;
        h3{
          text-align: center;
          color: red;
          line-height: 50px;
        }
      }
      section{
      width: 6rem;
        
        height: 100%;
        padding-top: 50px;
        overflow-y: auto;
        box-sizing: border-box;
        img{
          position: relative;
          top: .1rem;
          left: 0;
        }
        // padding-left: 10px;
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
        p{
          width: 100%;
          overflow: hidden;
        }
        .count{
          height: 40px;
          font: 20px/40px "SimSun";
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          span{
            float: right;
          }
        }
        i{
          box-sizing: border-box;
          padding-left: 10px;
          display: inline-block;
          width: 100%;
          color: #aaa;
          height: 35px;
          background-color: #ddd;
          line-height: 40px;
        }
        .con{
          padding-left: 10px;
          line-height: 40px;
          p{
            height: 40px;
            border-bottom: 1px dashed #aaa;
            &.cur{
              color: red;
            }
          }
        }
      }
    }
    .bg{
      // position: fixed;
      // left: 0;
      // top: 0;
      width:1.5rem;
      height: 100%;
      background-color: rgba(0, 0, 0, .5)
    }
  }
</style>
