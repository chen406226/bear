<!--
    上传照片组件
-->

<template>
    <div class="father">
        <div class="content" v-if="!showPhoto">
            <img class="icon_add" src="/static/img/icon_add.png" alt="">
            <p class="label" v-text="data.string"></p>
            <!-- <form ref="formfile" action="/upload/jpg" method="post" encType="multipart/form-data"  > -->
            <input type="file" @change="loadform" ref="refString" name="avatar"
                       accept="image/png,image/jpg" class="file"/>
            <!-- </form> -->
        </div>
        <div class="imageContent" v-show="showPhoto" ref="less">
            <img v-if="imageUrl" :src="imageUrl" alt="">
        </div>
    </div>
</template>
<script>
import api from '../axios.js'
import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'UploadPhotos',
        data() {
            return {
                showPhoto:false,
                imageUrl:''
            }
        },
        props: {
            data: Object,
        },
        computed: {
            styleObject() {
                // let imageUrl = this.imageUrl;
                // let style = {
                //     background: `url(${imageUrl}) no-repeat`,
                //     backgroundSize: 'cover'
                // }
                // return style;
            }
        },
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            async loadform(){
                // const formData=new FormData(this.$refs.formfile)
                const formData=new FormData()
                formData.append('avatar', this.$refs.refString.files[0])
                
                const res = await fetch('http://localhost:8888/upload/jpg',{
                    method:"POST",
                    headers:{
                    "Access-Control-Allow-Origin":"*"
                    },
                    body:formData
                }).then((data)=>{return data.json()})
                // const dizhi = res.filename
                console.log(res,'res')
                if (res.success) {
                    this.showPhoto = true;
                    this.$props.data.showimg = true;
                    this.imageUrl = "static/uploads/" + res.filename;
                    // this.$props.data.imgurl = "static/img/" + res.filename;
                    // this.addstyle();
                }
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
            async clickUpload() {
                // if (this.$refs.refString.files[0].size>2000000) {
                //     this.showMsg('请上传小于2M的照片')
                //     return
                // }
                let form = new FormData()
                form.append('file', this.$refs.refString.files[0])
                form.append('token', this.info.token)
                let xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    if (xhr.status == 200 || xhr.status == 304) {
                        const data = JSON.parse(xhr.responseText)
                        if (data.responseCode==='000000') {
                            this.showPhoto = true;
                            this.$props.data.showimg = true;
                            this.imageUrl = data.obj.fileUrl;
                            this.$props.data.imgurl = data.obj.fileUrl;
                            this.addstyle();
                        }
                    }
                }
                xhr.open("POST", API.uploadImageCommon)
                xhr.send(form)

            },
            addstyle(){
                this.$refs.less.style.background= `url(${this.imageUrl}) no-repeat`;
                this.$refs.less.style.backgroundSize='cover'
            }
        },
        computed: {
            ...mapGetters([
            ])
        },
    }
</script>
<style lang="less" scoped>
    .father {
        height: 100%;
    }
    .content {
        width: 6.9rem;
        height: 2.96rem;
        color: #ccc;
        border: 1px dashed #e5e5e5;
        margin:0 .3rem;
        background-color: #fff;
        text-align: center;
        position: relative;

        .icon_add {
            width: .6rem;
            height: .6rem;
    }

        .label {
            margin-top: .3rem;
        }

        .file {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    .imageContent {
        width: 100%;
        height: 100%;
        img {
            max-height: 300px;
        }
    }

</style>
