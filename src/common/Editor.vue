<template>
    <div>
        <p>你好</p>
        <!-- <vue-html5-editor :content="content" :height="500"></vue-html5-editor> -->
        <ck-editor :content="content" @change="updateData" :height="500"></ck-editor>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                content: "<h3>我有酒我要听你讲故事&nbsp;^_^</h3>",
            }
        },
        methods:{
            updateData(e){
                console.log(e)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>