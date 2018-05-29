const System = require('../db.js').System;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

//数据库的操作
//根据用户名查找用户
const findSystem = (id) => {
    return new Promise((resolve, reject) => {
        System.findOne({ id }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};


const findAllSystems = () => {
    return new Promise((resolve, reject) => {
        System.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//删除某个用户
const delSystem = function(id){
    return new Promise(( resolve, reject) => {
        System.findOneAndRemove({ _id: id }, err => {
            if(err){
                reject(err);
            }
            console.log('删除用户成功');
            resolve();
        });
    });
};

//登录
const Getcount = async ( ctx ) => {
    //拿到账号和密码
    let doc = await findSystem(1);
    console.log(doc)
    if(!doc){
        let system = new System({
            id: 1,
            count: 1,
            regcount: 0,
        });
        console.log('reg')
      await new Promise((resolve, reject) => {
        system.save((err) => {
              if(err){
                  reject(err);
              }
              resolve();
          });
      });
      ctx.status = 200;
      ctx.body = {
          success: true,
          count:system.count,
          regcount:system.regcount,
      }
    }else{
        doc.count =doc.count+1;
        await new Promise((resolve, reject) => {
            doc.save((err,produce) => {
                if(err){
                    reject(err);
                }
                resolve();
                ctx.status = 200;
                ctx.body = {
                    success: true,
                    count:produce.count,
                    regcount:produce.regcount,
                }
            });
        });
    }
};

const Setregcount = async ( ) => {
    //拿到账号和密码
    let doc = await findSystem(1);
    doc.regcount =doc.regcount+1;
    await new Promise((resolve, reject) => {
        doc.save((err,produce) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    });
    
};

module.exports = {
    Getcount,
    Setregcount
};