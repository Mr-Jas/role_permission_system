const Router = require('koa-router')
const {  } = require('../../validator/validator')
const { Module } = require('../../model/module')

const router = new Router({
  prefix:'/v1/modules'
})

router.get('/',async ctx =>{
  await Module.getModuleList();
})

module.exports = router