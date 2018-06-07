const ArticleController = require('../controller/article.js');
const Router = require('koa-router');

const childRouter = new Router();

//checkToken作为中间件存在
const checkToken = require('../token/checkToken.js');

// childRouter.post('/musicinfo', MusicController.Info);
childRouter.get('/infos', ArticleController.Infos);
//添加
childRouter.post('/create', ArticleController.Create);
//查找详情
childRouter.post('/detail', ArticleController.Detail);
//评论
childRouter.post('/comment', ArticleController.Comment);
//获得列表
childRouter.post('/list', ArticleController.GetlimitArticle);
//删除评论
// childRouter.post('/delcomment', MusicController.DelComment);

//需要先检查权限的路由
// childRouter.get('/user', checkToken, UserController.GetAllUsers);
// childRouter.post('/delUser', checkToken, UserController.DelUser);

module.exports = childRouter;