const Router = require('koa-router')
const {AuthorityValidator} = require('../../validator/validator')
const {Authority} = require('../../model/authority')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
  prefix:'/v1/authority'
})

router.post('/', new Auth().m, async (ctx)=>{
  const v = await new AuthorityValidator().validate(ctx)
  const auth = {
    moduleId:v.get('body.moduleId'),
    operateId:v.get('body.operateId'),
    method:v.get('body.method'),
    interface:v.get('body.url'),
  }
  await Authority.addAuth(auth)
})

router.get('/', new Auth().m, async ctx =>{
  const authList = await Authority.getAuthList();
  throw new global.errs.Success(authList)
})

router.put('/', new Auth().m, async (ctx)=>{
  const v = await new AuthorityValidator().validate(ctx)
  const auth = {
    id:v.get('body.id'),
    moduleId:v.get('body.moduleId'),
    operateId:v.get('body.operateId'),
    method:v.get('body.method'),
    interface:v.get('body.url'),
  }
  await Authority.updateAuth(auth)
})

router.delete('/', new Auth().m, async ctx =>{
  const authId = ctx.request.query.id
  await Authority.deleteAuth(authId)
})

module.exports = router