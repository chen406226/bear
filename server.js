const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors')
//router
const Router = require('koa-router');

//父路由
const router = new Router();

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入子路由
const loginRouter = require('./server/routes/user.js');
const musicRouter = require('./server/routes/music.js');
const handleRouter = require('./server/routes/handle.js');
const articleRouter = require('./server/routes/article.js');
const questRouter = require('./server/routes/quest.js');
//装载子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/music', musicRouter.routes(), musicRouter.allowedMethods());
router.use('/upload', handleRouter.routes(), handleRouter.allowedMethods());
router.use('/article', articleRouter.routes(), articleRouter.allowedMethods());
router.use('/quest', questRouter.routes(), questRouter.allowedMethods());

//加载路由中间件

app.use(cors()).use(router.routes()).use(router.allowedMethods());


const convert = require('koa-convert');
app.use(convert(require('koa-static')(__dirname + '/dist')));

app.listen(8888, () => {
    console.log('The server is running at http://localhost:' + 8888);
});