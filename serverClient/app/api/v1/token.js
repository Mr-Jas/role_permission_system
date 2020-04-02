const Router = require('koa-router')
const { UsernamePwdValidator } = require('../../validator/validator')
const { User } = require('../../model/user')
const { generateToken } = require('../../../core/util')

const router = new Router({
  prefix: '/v1/token'
})
//登录
router.post('/', async (ctx) => {
  const v = await new UsernamePwdValidator().validate(ctx)
  const user = await User.verifyAcountPassword(v.get('body.username'), v.get('body.password'))
  const token = generateToken(user.id, user.account, user.roleId)
  throw new global.errs.Success({token})
})



module.exports = router