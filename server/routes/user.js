const UserController = require('../controller/user.js');
const SystController = require('../controller/system.js');
// const ChartController = require('../controller/charts.js');
const Router = require('koa-router');

const childRouter = new Router();

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

childRouter.post('/login', UserController.Login);
childRouter.post('/register', UserController.Reg);
childRouter.post('/update', UserController.Update);
// childRouter.get('/infos', MusicController.Infos);

//需要先检查权限的路由
childRouter.get('/user', checkToken, UserController.GetAllUsers);
childRouter.post('/delUser', checkToken, UserController.DelUser);
// childRouter.post('/charts', checkToken, ChartController.AddChart);

//系统默认的
childRouter.get('/count', SystController.Getcount);

module.exports = childRouter;