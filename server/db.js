const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vue-login');

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//创建用户schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    avatar:String,  //用户头像地址
    signature:String,  //个性签名
    token: String,  
    create_time: Date,
    msg:[{
        from:String,
        readed:false
    }]
});
//创建系统数据
const systemSchema = mongoose.Schema({
    id:Number,
    count: Number,
    regcount: Number,
    msg:[{
        create_time: Date,
        text:String,
        type:String
    }]
});
//创建音乐schema
const musicSchema = mongoose.Schema({
    id:Number,
    create_user: String,
    createtext:String,
    songinfo: {
        name:String,
        artistname:String,
        slbumname:String
    },
    comment:[{
        username:String,
        text:String
    }],
    create_time:Date
})
//创建聊天
const chartSchema = mongoose.Schema({
    id:Number,
    user1: String,
    user2:String,
    comment:[{
        fromuser:String,
        text:String,
        create_time:Date
    }]
})
//创建文章schema
const articleSchema = mongoose.Schema({
    id:Number,
    create_user: String,
    createtext:String,
    url:[String],
    comment:[{
        username:String,
        text:String
    }]
})

// db.product.find({"parameSet":{"$elemMatch":{"564c408fe4b005ef3b0c1a69":"KFFF"}}})
//创建分享schema
const shareSchema = mongoose.Schema({
    id:Number,
    create_user: String,
    createtext:String,
    link:String,
    comment:[{
        username:String,
        text:String
    }]
})
//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema),
    Music:mongoose.model('Music',musicSchema),
    System:mongoose.model('System',systemSchema),
};

module.exports = model;
