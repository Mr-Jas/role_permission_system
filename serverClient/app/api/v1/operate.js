const Router = require('koa-router')
const {  } = require('../../validator/validator')
const { Operate } = require('../../model/operate')

const router = new Router({
  prefix:'/v1/operates'
})

router.get('/',async ctx =>{
  await Operate.getOperateList();
})

module.exports = router