const Router = require('koa-router')
const { RoleAuthValidator,IdValidator } = require('../../validator/validator')
const {RoleAuth} = require('../../model/roleAuth')

const router = new Router({
  prefix:'/v1/roleAuth'
})

router.put('/',async (ctx)=>{
  const v = await new RoleAuthValidator().validate(ctx)
  let res = await RoleAuth.updateRoleAuth(v.get('body.roleId'),v.get('body.auths'))
  if (res) {
    throw new global.errs.Success()
  }
})
router.get('/',async (ctx)=>{
  const v = await new IdValidator().validate(ctx,{id:'roleId'})
  const list = await RoleAuth.getRoleAuthList(v.get('query.roleId'))
  ctx.body = {
    list
  }
})

module.exports = router