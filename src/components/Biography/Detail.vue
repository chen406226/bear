<template>
  <div>
    <div class="header">
      <img :src="imgpath" >
    </div>
    <p>hello</p>
    <p>nkjs</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgpath:'static/img/persons.png'
      }
    },
    mounted(){
      console.log(this.$route)
    }
  }
</script>

<style scoped lang="less">
.header{
  overflow:hidden;
  img{
    width: 100%;
  }
}
</style>