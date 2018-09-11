<template>
  <div>
    <div :style="{width:'7.5rem',height:'9rem'}">

    <div class="test" :style="{width:'7.5rem',height:'3.5rem'}">
      <vueCropper
        ref="cropper2"
        :img="example2.img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :autoCropWidth="example2.autoCropWidth"
        :autoCropHeight="example2.autoCropHeight"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
      ></vueCropper>
    </div>
    <label class="btn" for="upload2">选择图片</label>
    <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
    <button :style="{}" @click="finish2('base64')" class="btn">确认上传</button>
    </div>
    <p>{{d}}</p>
  </div>
</template>

<script>
import VueCropper from '../../common/vue-cropper'
import api from '../../axios.js'
import { setTimeout } from 'timers';

  export default {
    data(){
      return {
        d:'',
        username:this.$route.query.username,
        example2: {
					// img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
					img: '/static/avatar/'+this.$route.query.url,
					info: true,
					size: 1,
					outputType: 'jpeg',
					canScale: false,
					autoCrop: true,
					// 只有自动截图开启 宽度高度才生效
					autoCropWidth: 300,
					autoCropHeight: 250,
					// 开启宽度和高度比例
					fixed: true,
					fixedNumber: [1, 1]
				}
      }
    },
    components:{
      VueCropper
    },
    methods:{
      uploadImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      finish2 (type) {
        this.$refs.cropper2.getCropData((data) => {
          this.model = true
          this.modelSrc = data
          this.changeinfo(data)
        })
      },
      async changeinfo(data){
        const res = await api.UpdateUser({
          username:sessionStorage.getItem('username'),
          key:'avatar',
          value:data
        })
        if (res.success) {
          if (sessionStorage.getItem('avatar')!=sessionStorage.getItem('username')+'.jpg') {
            sessionStorage.setItem('avatar',sessionStorage.getItem('username')+'.jpg')
          }
          setTimeout(()=>{
            this.$router.push('/my')
          },200)
        }
      }
    }
  }
</script>

<style scoped>
  .btn {
    background: white;
    border-radius: 3px;
    border: 0.01rem solid #243;
    padding: .02rem .03rem;
    box-shadow: 0px 4px rgba(86, 226, 31, 0.2);
    color: #888;
    text-align: center;
    user-select: none;
    line-height: .45rem;
    height: .45rem;
    font-size: .3rem;
  }
</style>