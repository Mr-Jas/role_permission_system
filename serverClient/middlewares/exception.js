const {HttpException} = require('../core/http-exception')

const catchError = async (ctx,next)=>{
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.env === 'dev'

    if (isDev && !isHttpException) {
      throw error
    }
    
    if(isHttpException){
      //可预知错误
      ctx.body = {
        data:error.msg,
        code:error.errorCode,
        requestUrl:`${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }else{
      //不可预知错误
      ctx.body = {
        data:'we made a mistake！',
        code:999,
        requestUrl:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError