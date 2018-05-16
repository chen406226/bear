const Music = require('../db.js').Music;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../token/createToken.js');

//数据库的操作
//根据用户名查找用户
const findMusic = (id) => {
    return new Promise((resolve, reject) => {
        Music.findOne({ id }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//按需查找
const findlimitMusic = (page,pageSize) => {
    return new Promise((resolve, reject) => {
        Music.find({},null,{ skip:(page-1)*pageSize },{ limit:pageSize }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//找到所有音乐
const findAllMusic = () => {
    return new Promise((resolve, reject) => {
        Music.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//删除某个音乐
const delMusic = function(id){
    return new Promise(( resolve, reject) => {
        Music.findOneAndRemove({ id }, err => {
            if(err){
                reject(err);
            }
            console.log('删除用户成功');
            resolve();
        });
    });
};
//
const addComment = function(id,username,text){
    return new Promise(( resolve, reject) => {
        Music.update({ id },{'$push':{comment:{username,text}}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};
//
const delComment = function(id,username,text){
    return new Promise(( resolve, reject) => {
        Music.update({ id },{'$pull':{comment:{_id:123}}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};
//创建
// const Create = async ( ctx ) => {
    
//     let id = ctx.request.body.id;
//     let doc = await findMusic(id);
//     if(doc){
//         ctx.status = 200;
//         ctx.body = {
//             info: false,
//             mes: '已创建请去评论'
//         }
//     }else {
//         let music = new Music({
//             id,
//             comment : [],
//             songinfo : ctx.request.body.songinfo,
//             createtext : ctx.request.body.createtext,
//             create_user : ctx.request.body.create_user,
//         });
//         await new Promise((resolve, reject) => {
//             doc.save((err) => {
//                 if(err){
//                     reject(err);
//                 }
//                 resolve();
//             });
//         });

//         ctx.status = 200;
//         ctx.body = { 
//             success: true,
//             username,
//             token, //登录成功要创建一个新的token,应该存入数据库
//             create_time: doc.create_time
//         };
//     }else if(false){
//         console.log('密码错误!');
//         ctx.status = 200;
//         ctx.body = {
//             success: false
//         };
//     }
// };
//注册
const Create = async ( ctx ) => {
    let music = new Music({
        id : ctx.request.body.id,
        comment : [],
        songinfo : ctx.request.body.songinfo,
        createtext : ctx.request.body.createtext,
        create_user : ctx.request.body.create_user,
    });
    let doc = await findMusic(music.id);
    if(doc){ 
        console.log('歌曲已经存在');
        ctx.status = 200;
        ctx.body = {
            success: false,
            mes:'歌曲已存在请去评论区'
        };
    }else{
        await new Promise((resolve, reject) => {
            music.save((err) => {
                if(err){
                    reject(err);
                }
                resolve();
            });
        });
        console.log('创建成功');
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    }
};
//获得所有用户信息
const GetAllUsers = async( ctx ) => {
    //查询所有用户信息
    let doc = await findAllUsers();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};

//获得部分
const GetlimitMusic = async( ctx ) => {
    //查询所有用户信息
    let page = ctx.request.body.page;
    let pageSize = ctx.request.body.pageSize;
    
    let doc = await findlimitMusic(page,pageSize);
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};

//删除某个用户
const DelMusic = async( ctx ) => {
    //拿到要删除的用户id
    let id = ctx.request.body.id;
    await delMusic(id);
    ctx.status = 200;
    ctx.body = {
        success: '删除成功'
    };
};

const Comment = async( ctx ) => {
    let id = ctx.request.body.id;
    let username = ctx.request.body.username;
    let text = ctx.request.body.text;
    await addComment(id,username,text)
    ctx.status = 200;
    ctx.body = {
        success: '评论成功'
    };
};

const Infos = async( ctx ) => {
  //拿到要删除的用户id
  let id = ctx.request.body.id;
  ctx.status = 200;
  ctx.body = {
      success: '删除成功'
  };
};
// const Create = async( ctx ) => {
//     //拿到要删除的用户id
//     console.log(1232)
//     let id = ctx.request.body.id;
//     console.log(ctx)
//     await delUser(id);
//     ctx.status = 200;
//     ctx.body = {
//         success: '删除成功'
//     };
//   };
module.exports = {
    Infos,Create,Comment
};