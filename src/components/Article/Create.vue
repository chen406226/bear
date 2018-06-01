<template>
  <div>
    下雨了你可能怪他没有出现给你撑伞
    <UploadPhotos :data="item" />
  </div>
</template>

<script>
import React, { Component } from 'react';
  export default {
    data() {
      return {
        list:{
          str:'本人手持身份证反面露脸照',
          string:'手持国徽面',
          showimg:false,
          imgurl:'',
        }
      }
    }
  }
</script>

<style scoped>

</style>