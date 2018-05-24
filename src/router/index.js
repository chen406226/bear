import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

Vue.use(Router);

//路由懒加载
const Login = resolve => {
  require.ensure(['../components/Login.vue'], () => {
    resolve(require('../components/Login.vue'));
  });
};

const Register = resolve => {
  require.ensure(['../components/Register.vue'], () => {
    resolve(require('../components/Register.vue'));
  });
};

const Hello = resolve => {
  require.ensure(['../components/Hello.vue'], () => {
    resolve(require('../components/Hello.vue'));
  });
};

const Test = resolve => {
  require.ensure(['../components/Test.vue'], () => {
    resolve(require('../components/Test.vue'));
  });
};

const Indexd = resolve => {
  require.ensure(['../components/Indexd.vue'], () => {
    resolve(require('../components/Indexd.vue'));
  });
};

const Music = resolve => {
  require.ensure(['../components/Music/Music.vue'], () => {
    resolve(require('../components/Music/Music.vue'));
  });
};

const CreateMusic = resolve => {
  require.ensure(['../components/Music/Create.vue'], () => {
    resolve(require('../components/Music/Create.vue'));
  });
};

const DetailMusic = resolve => {
  require.ensure(['../components/Music/Detail.vue'], () => {
    resolve(require('../components/Music/Detail.vue'));
  });
};

const Biography = resolve => {
  require.ensure(['../components/Biography/Biography.vue'], () => {
    resolve(require('../components/Biography/Biography.vue'));
  });
};

const My = resolve => {
  require.ensure(['../components/My/My.vue'], () => {
    resolve(require('../components/My/My.vue'));
  });
};

const MyIndex = resolve => {
  require.ensure(['../components/My/Index.vue'], () => {
    resolve(require('../components/My/Index.vue'));
  });
};

const Article = resolve => {
  require.ensure(['../components/Article/Article.vue'], () => {
    resolve(require('../components/Article/Article.vue'));
  });
};
const CreateArticle = resolve => {
  require.ensure(['../components/Article/Create.vue'], () => {
    resolve(require('../components/Article/Create.vue'));
  });
};

const BioDetail = resolve => {
  require.ensure(['../components/Biography/Detail.vue'], () => {
    resolve(require('../components/Biography/Detail.vue'));
  });
};
const Error404 = resolve => {
  require.ensure(['../components/404.vue'], () => {
      resolve(require('../components/404.vue'));
  }); 
};

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Indexd',
      component: Indexd
    },{
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register 
    },
    {
      path: '*',
      name: 'error',
      component: Error404
    },{
      path: '/music',
      name: 'music',
      component: Music,
    },{
      path: '/music/create',
      component: CreateMusic,
    },{
      path: '/music/detail',
      name: 'detail',
      component: DetailMusic,
    },{
      path: '/biography',
      name: 'biography',
      component: Biography,
    },{
      path: '/biography/detail',
      component: BioDetail,
    },{
      path: '/article',
      component: Article,
    },{
      path: '/article/create',
      component: CreateArticle,
    },{
      path: '/my/info',
      component: My,      
    },{
      path: '/my',
      component: MyIndex,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
});

export default router;


