class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

// lin-validator-v2依赖ParameterException
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

/*
errorCode:   
  20000：资源存在
  20001：账号密码错误
*/
class Success extends HttpException {
  constructor(msg,errorCode){
    super()
    this.code = 200
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

class ResourceExist extends HttpException {
  constructor(msg,errorCode){
    super()
    this.code = 200
    this.msg = msg || '资源已存在'
    this.errorCode = errorCode || 20000
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
  }
}

class Unauthorized extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '未经授权'
    this.errorCode = errorCode || 10006
  }
}


module.exports = {
  HttpException,
  ParameterException,
  Success,
  ResourceExist,
  Forbbiden,
  Unauthorized
}