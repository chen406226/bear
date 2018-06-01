<!--
    上传照片组件
-->

<template>
    <div class="father">
        <div class="content" v-if="!showPhoto">
            <img class="icon_add" src="/static/img/my/icon_add.png" alt="">
            <p class="label" v-text="data.string"></p>
            <input type="file" @change="clickUpload" ref="refString"
                       accept="image/png,image/jpg" class="file"/>
        </div>
        <div class="imageContent" v-show="showPhoto" ref="less"></div>
    </div>
</template>
<script>
    import API from '@/api'
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
                'info'
            ])
        },
    }
</script>
<style lang="scss" scoped>
    .father {
        @include box((h:100%))
    }
    .content {
        @include box((w: 6.9rem, h: 2.96rem, c: #ccc, br: 1px dashed #e5e5e5));
        padding-top: .9rem;
        background-color: #fff;
        text-align: center;
        position: relative;

        .icon_add {
            @include box((w: .6rem, h: .6rem));
        }

        .label {
            margin-top: .3rem;
        }

        .file {
            @include position((p:absolute, t:0, l:0, z:1));
            @include box((w:100%, h:100%, o:0));
        }
    }

    .imageContent {
        width: 100%;
        height: 100%;

    }

</style>
