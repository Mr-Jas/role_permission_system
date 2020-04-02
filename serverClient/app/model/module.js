const {Sequelize,Model,Op} = require('sequelize')
const { sequelize } = require('../../core/db')

class Module extends Model{
  static async getModuleList(){
    const modules = await Module.scope('bh').findAll()
    throw new global.errs.Success(modules)
  }
}

Module.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  moduleName:{
    type:Sequelize.STRING,
    unique: true,
  }
},{
  sequelize,
  tableName:'module'
})

// Module.sync().then(()=>{
//   Module.bulkCreate([
//     {moduleName:'图标'},
//     {moduleName:'用户'},
//     {moduleName:'角色'},
//     {moduleName:'权限'},
//   ])
// })

module.exports = {
  Module
}