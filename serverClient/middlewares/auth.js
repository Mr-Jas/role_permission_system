const jwt = require('jsonwebtoken')

class Auth {
  constructor(val){
    this.noAuth = val
  }

  get m(){
    return async (ctx,next)=>{
      const { RoleAuth } = require('../app/model/roleAuth')
      const { Authority } = require('../app/model/authority')

      const userToken = ctx.header.authorization
      let errMsg = 'token不合法'
      if (!userToken) {  
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken,global.config.security.secretKey)
        console.log('解析后',decode)
      } catch (error) {
        //token不合法
        //token过期
        if (error.name == 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbbiden(errMsg)
      }
      //用户ID不为1 且 需要接口鉴权 
      if (decode.id!=1 && !this.noAuth) {
        let isPass = false
        const roleAuths = await RoleAuth.findAll({
          where:{
            roleId:decode.roleId
          }
        })
        const auths = await Authority.findAll()
        roleAuths.forEach(roleAuth =>{
          auths.forEach(auth =>{
            if (roleAuth.authId===auth.id) {
              let path = ctx.path
              if(path.lastIndexOf('/') == path.length-1){
                path = path.slice(0,-1)
              }
              if (ctx.method==auth.method && path==auth.interface) {
                isPass = true
              }
            }
          })
        })
        console.log(ctx.method,ctx.path)
        if(!isPass){
          throw new global.errs.Unauthorized('您无此权限')
        }
      } 
      await next()
    }
  }

  static verifyToken(token){
    try {
      jwt.verify(token,global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}