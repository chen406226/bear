import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'


Vue.use(Vuex);

//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
    token: window.sessionStorage.getItem('token'),
    username: '',
    msg: {
        show: false,
        content: 'saf',
        time: 2000
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});