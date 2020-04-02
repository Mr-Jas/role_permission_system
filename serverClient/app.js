const Koa = require('koa')
const koaBody = require('koa-body')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception') 

const app = new Koa()
require('./app/model/module')
require('./app/model/operate')
app.use(catchError) //全局捕捉错误
app.use(koaBody())
InitManager.initCore(app)


app.listen(8888,()=>{
  console.log('8888服务启动')
})