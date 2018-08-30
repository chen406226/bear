// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui';

//引用elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import CkEditor from './ck-editor.js'
// var CkEditor = require('./ck-editor.js')
// import {CkEditor} from './ck-editor.js'

import store from './store'
// console.log(CkEditor)
Vue.use(ElementUI);
Vue.use(MintUI);
//引入store
// Vue.use(CkEditor,{name:'ck-editor'})



//在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
