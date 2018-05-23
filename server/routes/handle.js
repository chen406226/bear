const Router = require('koa-router');
const multer = require('koa-multer');//加载koa-multer模块  
const formidable=require("formidable")

//文件上传  
//配置  
const childRouter = new Router();
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'public/uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var uploadm = multer({ storage: storage });  
var upload = uploadm.single('avatar')
//路由  
childRouter.post('/jpg',upload, async (ctx, next) => {  
  // var form = new formidable.IncomingForm();
  // form.parse(ctx.req,(err,fields,files)=>{
  // })
  ctx.status = 200;
  ctx.body = {  
    success: '上传成功',
    filename: ctx.req.file.filename
  }  
})  

module.exports = childRouter;