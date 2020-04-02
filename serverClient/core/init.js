const requireDirectory = require('require-directory')
const KoaRouter = require('koa-router')
const cors = require('koa2-cors');

class InitManager {
  static initCore(app){
    InitManager.app = app
    InitManager.loadCors()
    InitManager.loadConfig()
    InitManager.loadHttpException()
    InitManager.initLoadRouters()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters(){
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
    function whenLoadModule(obj) {  //只有是Router实例的才注册到app上
      if (obj instanceof KoaRouter) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }

  static loadCors() {
    InitManager.app.use(cors({
      origin: function (ctx) {
        //  if (ctx.url === '/test') {
        //    return false;
        //  }
         return '*'; //允许来自所有域名请求
        // return 'http://localhost:8080';
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));
  }
}

module.exports = InitManager