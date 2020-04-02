const Router = require('koa-router')
const {RegisterValidator,PasswordValidator,TokenValidator} = require('../../validator/validator')
const {User} = require('../../model/user')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
  prefix:'/v1/user'
})

//获取登录者信息
router.get('/info', new Auth(true).m, async (ctx)=>{
  const v = await new TokenValidator().validate(ctx)
  const token = v.get('query.token')
  await User.getUserInfo(token)
})

//注销
router.post('/logout',async (ctx)=>{
  throw new global.errs.Success('成功')
})

//获取用户列表
router.get('/', new Auth().m, async (ctx)=>{
  const users = await User.getUserList()
  
  throw new global.errs.Success(users)
})

//添加用户
router.post('/', new Auth().m, async (ctx)=>{
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    account:v.get('body.account'),
    password:v.get('body.pass'),
    roleId:v.get('body.roleId')
  }
  await User.checkRegister(user.account)
  await User.create(user)
  throw new global.errs.Success()
})

//修改密码
router.put('/password', new Auth().m, async ctx =>{
  // 此处没有验证参数id 
  const v = await new PasswordValidator().validate(ctx)
  const user = {
    id:v.get('body.id'),
    password:v.get('body.pass'),
  }
  await User.updateUserPwd(user)
})

//修改角色
router.put('/role', new Auth().m, async ctx=>{
  // console.log(ctx.request.body)
  // 此处省略了参数验证
  const user = {
    id:ctx.request.body.userId,
    roleId:ctx.request.body.roleId,
  }
  await User.updateUserRole(user)
})

//删除用户
router.delete('/', new Auth().m, async ctx=>{
  // 此处省略了参数验证
  const id = ctx.request.query.id
  await User.delUser(id)
})



module.exports = router