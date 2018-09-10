const QuestController = require('../controller/quest.js');
const Router = require('koa-router');
const childRouter = new Router();

childRouter.post('/list',QuestController.GetlimitQuest)
// 获得列表
childRouter.post('/create',QuestController.Create)
//添加实例
childRouter.post('/addanswer',QuestController.Addanswer)
//添加回答
childRouter.post('/detail',QuestController.DetailQuest)
//获得详情




module.exports = childRouter