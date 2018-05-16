const MusicController = require('../controller/music.js');
const Router = require('koa-router');

const childRouter = new Router();

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

// childRouter.post('/musicinfo', MusicController.Info);
childRouter.get('/infos', MusicController.Infos);
//添加
childRouter.post('/create', MusicController.Create);
//评论
childRouter.post('/comment', MusicController.Comment);
//需要先检查权限的路由
// childRouter.get('/user', checkToken, UserController.GetAllUsers);
// childRouter.post('/delUser', checkToken, UserController.DelUser);

module.exports = childRouter;