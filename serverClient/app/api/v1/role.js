const Router = require('koa-router')
const {RoleValidator} = require('../../validator/validator')
const {Role} = require('../../model/role')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
  prefix:'/v1/role'
})

router.post('/', new Auth().m, async (ctx)=>{
  const v = await new RoleValidator().validate(ctx)
  const roleName = v.get('body.roleName')
  const auths = v.get('body.auths')
  await Role.checkRole(roleName)
  await Role.addRole(roleName,auths)
  throw new global.errs.Success()
})

router.get('/', new Auth().m, async ctx =>{
  const roles = await Role.getRoleList();
  throw new global.errs.Success(roles)
})

router.put('/', new Auth().m, async (ctx)=>{
  const v = await new RoleValidator().validate(ctx)
  const role = {
    id:v.get('body.id'),
    roleName:v.get('body.roleName'),
    auths:v.get('body.auths')
  }
  await Role.updateRole(role)
})

router.delete('/', new Auth().m,  async (ctx)=>{
  let roleId = ctx.request.query.id
  await Role.deleteRole(roleId)
})

module.exports = router