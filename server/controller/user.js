const User = require('../db.js').User;
const system = require('./system.js')
const fs = require('fs');
const path=require("path")
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../token/createToken.js');

//数据库的操作
//根据用户名查找用户
const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//找到所有用户
const updateUser = function(username,key,value){
    return new Promise(( resolve, reject) => {
        User.update({ username },{'$set':{[key]:value}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};


const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//删除某个用户
const delUser = function(id){
    return new Promise(( resolve, reject) => {
        User.findOneAndRemove({ _id: id }, err => {
            if(err){
                reject(err);
            }
            resolve();
        });
    });
};
//添加相关音乐
const addMusic = function(username,title,create_time,id){
    return new Promise(( resolve, reject) => {
        User.update({ username },{'$push':{mymusic:{title,create_time,id}}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};

//添加相关问答
const addQuest = function(username,_id,title,create_time){
    return new Promise((resolve,reject) => {
        User.update({username},{'$push':{myquest:{username,_id,title,create_time}}},(err,data)=>{
            if (err) {
                reject(err)
            }
            resolve();
        })
    })
}


//添加文章
const addArticle = function(username,title,create_time){
    return new Promise(( resolve, reject) => {
        User.update({ username },{'$push':{myarticle:{title,create_time}}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};
//添加聊天 (from,chart._id,to)
const addChart = function(username,_id,withp){
    return new Promise(( resolve, reject) => {
        User.update({ username },{'$push':{charts:{_id,withp}}},(err,data)=>{
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};

const Login = async ( ctx ) => {
    //拿到账号和密码
    let username = ctx.request.body.username;
    let password = sha1(ctx.request.body.password);
    
    let doc = await findUser(username);
    if(!doc){
        ctx.status = 200;
        ctx.body = {
            success:false,
            mes:'用户不存在'
        }
    }else if(doc.password === password){

         //生成一个新的token,并存到数据库
        let token = createToken(username);
        doc.token = token;
        await new Promise((resolve, reject) => {
            doc.save((err) => {
                if(err){
                    reject(err);
                }
                resolve();
            });
        });

        ctx.status = 200;
        ctx.body = { 
            success: true,
            username,
            avatar:doc.avatar,
            token, //登录成功要创建一个新的token,应该存入数据库
            create_time: doc.create_time
        };
    }else{
        ctx.status = 200;
        ctx.body = {
            success: false,
            mes:'密码错误'
        };
    }
};
//注册
const Reg = async ( ctx ) => {
    let user = new User({
        username: ctx.request.body.username,
        avatar:'dog2.png',
        mymusic:[],
        myarticle:[],
        password: sha1(ctx.request.body.password), //加密
        token: createToken(this.username) //创建token并存入数据库
    });
    //将objectid转换为用户创建时间(可以不用)
    user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    let doc = await findUser(user.username);
    if(doc){ 
        ctx.status = 200;
        ctx.body = {
            success: false,
            mes:'用户名已经存在'
        };
    }else{
        await new Promise((resolve, reject) => {
            user.save((err) => {
                if(err){
                    reject(err);
                }
                resolve();
                system.Setregcount();
            });
        });
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

//删除某个用户
const DelUser = async( ctx ) => {
    //拿到要删除的用户id
    let id = ctx.request.body.id;
    await delUser(id);
    ctx.status = 200;
    ctx.body = {
        success: '删除成功'
    };
};

const Update = async( ctx ) => {
    //拿到要删除的用户id
    let username = ctx.request.body.username;
    let key = ctx.request.body.key;
    let value = ctx.request.body.value;
    if (key == 'avatar') {
        let val = value.match(/base64,(.+)/)[1];
        value = username+'.jpg';
        const dirpath=path.resolve(__dirname,"../../dist/static/avatar/"+value);
        let bitmap = new Buffer(val,'base64')
        fs.writeFileSync(dirpath,bitmap)
    }
    await updateUser(username,key,value);
    ctx.status = 200;
    ctx.body = {
        success: '更新成功'
    };
};

const Mymusic = async( ctx ) => {
    //拿到要删除的用户id
    let username = ctx.request.body.username;
    let doc = await findUser(username);
    ctx.status = 200;
    ctx.body = {
        success: '更新成功',
        result:doc.mymusic,
    };
};


const Infos = ( ctx ) => {
    //拿到要删除的用户id
    ctx.status = 200;
    ctx.body = {
        success: '删除成功'
    };
  };

module.exports = {
    Login,
    Reg,
    GetAllUsers,
    DelUser,
    Infos,
    Update,
    addMusic,
    addArticle,
    addChart,
    Mymusic,
    addQuest
};