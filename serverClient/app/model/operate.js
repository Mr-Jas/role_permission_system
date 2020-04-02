const {Sequelize,Model,Op} = require('sequelize')
const { sequelize } = require('../../core/db')

class Operate extends Model{
  static async getOperateList(){
    const operates = await Operate.scope('bh').findAll()
    throw new global.errs.Success(operates)
  }
}

Operate.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  operateName:{
    type:Sequelize.STRING,
    unique: true,
  }
},{
  sequelize,
  tableName:'operate'
})

// Operate.sync().then(()=>{
//   Operate.bulkCreate([
//     {operateName:'浏览'},
//     {operateName:'创建'},
//     {operateName:'编辑'},
//     {operateName:'删除'},
//     {operateName:'密码修改'},
//     {operateName:'角色修改'},
//   ])
// })


module.exports = {
  Operate
}