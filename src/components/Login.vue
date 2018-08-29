<template>
    <div>
        <div  :style="{marginTop:'2rem',paddingRight:'1rem'}">
            <mt-field label="用户名" :state="loginForm.username.length>3?'success':'error'" placeholder="请输入用户名" v-model="loginForm.username"></mt-field>
            <mt-field label="密码" type="password" :state="loginForm.password.length>5?'success':'error'" placeholder="请输入用户名" v-model="loginForm.password">
            </mt-field>
            <!-- <Inp v-on:msg="getPwd" :value="loginForm.password" :type="pwd_type" ph="请输入登录密码">
            </Inp> -->
        </div>
        <div class="footer">
            <mt-button type="primary" @click="submitForm">登录</mt-button>
            <mt-button type="default" @click="()=>{this.$router.push('/register')}">去注册</mt-button>
        </div>
    </div>
</template>

<script>
import api from '../axios.js'
//引入验证组件
import Register from './Register.vue'
import Inp from '../common/Inpu.vue'
import {mapGetters, mapActions} from 'vuex'


export default {
    data(){
        return {
            type:true,
            activeName: 'login', //选项卡
            loginForm: {        //表单v-model的值
                username: '',
                password: ''
            },
            pwd_type: 'password',            
            rules: { //验证规则
                username: [
                    { required: true, message: '用户名不能少', trigger: 'blur'},
                    { min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        ...mapActions([
            'showMsg',
        ]),
        submitForm(formName){
            if (this.loginForm.username<4||this.loginForm.password<6) {
                this.showMsg('检测未通过')
            }
            let opt = this.loginForm;
            api.userLogin(opt)
                .then(( data ) => {     //解构赋值拿到data
                    console.log(data)
                    //账号存在
                    if(data.success){
                        this.showMsg('登录成功')
                        let token = data.token;
                        let username = data.username;
                        this.$store.dispatch('UserLogin', token);
                        this.$store.dispatch('UserName', username);
                        window.sessionStorage.setItem('avatar', data.avatar);
                        window.sessionStorage.setItem('signature', data.signature);
                        //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                        let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
                        //跳转到指定的路由
                        this.$router.push({
                            path: redirectUrl
                        });
                    }else {
                        this.showMsg(data.mes);
                        return ;
                    }
                });
                
        }
    },
    components: {
        Register,Inp
    }
}
</script>

<style scoped lang="less">
.footer{
    position: fixed;
    width: 7.5rem;
    bottom: 1rem;
    left: 0;
    // display: flex;
    // justify-content: center;
}
    
</style>