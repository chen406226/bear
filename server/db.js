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

//声明schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    avatar:String,  //用户头像地址
    signature:String,  //个性签名
    token: String,  
    create_time: Date
});

const musicSchema = mongoose.Schema({
    id:Number,
    create_user: String,
    createtext:String,
    songinfo: {
        id:Number,
        artistname:String,
        slbumname:String
    },
    comment:[{
        username:String,
        text:String
    }]
})



//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema),
    Music:mongoose.model('Music',musicSchema)
};

module.exports = model;
