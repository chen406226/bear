<template>
<div>
    <p>nihao</p>
    <div class="dialog" v-show="msg.show">

        <div class="content" v-text="msg.content"></div>
    </div>
</div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: 'msg',
        methods: {
            ...mapActions([
                'showMsg'
            ])
        },
        computed: {
            ...mapGetters([
                'msg'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 35%;
        left: 5%;
        z-index: 9999;
        width: 90%;
        background: rgba(0,0,0,0.7);
        border-radius: 0.2rem;
        text-align: center;
    }
    .content{
        color:#fff;
        font-size: 0.24rem;
        padding: 0.25rem 0.3rem
    }
</style>