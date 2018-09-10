const Quest = require('../db.js').Quest
const user = require('./user.js')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')



//查询
const findQuest = (_id) =>{
  return new Promise((resove,reject)=>{
    Quest.findById(_id,(err,doc)=>{
      if (err) {
        reject(err);
      }else{
        resove(doc);
      }
    })
  })
}

//查询所有
const findAllQuest = () => {
  return new Promise((resove,reject)=>{
    Quest.find({},(err,doc)=>{
      if (err) {
        reject(err)
      }else{
        resove(doc)
      }
    })
  })
}
//分页查询
const findLimitQuest = (page,pagesize)=>{
  return new Promise((resove,reject) => {
    Quest.find({}).sort({_id:-1}).skip((page-1)*pagesize).limit(pagesize).exec((err,doc)=>{
      if (err) {
        reject(err)
      }else{
        resove(doc)
      }
    })
  })
}
//添加回答
const addanswer = (_id,user,answer,score) => {
  return new Promise((resove,reject) => {
    Quest.update({_id},{'$push':{answers:{user,answer,score}}},(err,doc)=>{
      if (err) {
        reject(err)
      }else{
        resove()
      }
    })
  })
}

//创建实例
const Create = async (ctx) => {
  let quest = new Quest({
    create_user:ctx.request.body.createuser,
    title:ctx.request.body.title,
    issues:ctx.request.body.issues,
    answers:[],
  })
  quest.create_time = moment(objectIdToTimestamp(quest._id)).format('YYYY-MM-DD HH:mm');
  await new Promise((resove,reject) => {
    quest.save((err)=>{
      if (err) {
        reject(err)
      }
      resove()
    })
  })
  await user.addQuest(quest.create_user,quest._id,quest.title,quest.create_time)
  ctx.status = 200;
  ctx.body={
    success:true,
    mes:'创建成功'
  }
}

//获得列表
const GetlimitQuest = async (ctx) => {
  let page = ctx.request.body.page
  let pagesize = ctx.request.body.pagesize
  let doc = await findLimitQuest(page,pagesize)
  ctx.status = 200;
  ctx.body={
    success:'成功',
    result:doc
  }
}

//添加回答
const Addanswer = async (ctx) =>{
  let _id = ctx.request.body._id;
  let user = ctx.request.body.user;//答卷者
  let answer = ctx.request.body.answer;
  let score = ctx.request.body.score
  await addanswer(_id,user,answer,score)
  ctx.status = 200;
  ctx.body = {
    success:'成功',
  }
}

//
const DetailQuest = async (ctx) => {
  let _id = ctx.request.body._id;
  let doc = await findQuest(_id)
  ctx.status = 200;
  ctx.body = {
    success:'成功',
    data:doc
  }
}


module.exports = {
  Create,GetlimitQuest,Addanswer,DetailQuest
}