const {Sequelize,Model} = require('sequelize')
const { sequelize } = require('../../core/db')

class RoleAuth extends Model{
  static async updateRoleAuth(roleId,auths){
    let temp = auths.map(authId=>{
      return {roleId,authId}
    })
    let result = await RoleAuth.destroy({
      where:{
        roleId
      },
      force: true
    }).then(async ()=>{
      return await RoleAuth.bulkCreate(temp)
    })
    return result
  }
  
  static async getRoleAuthList(roleId){
    const list = await RoleAuth.scope('bh').findAll({
      where:{
        roleId
      }
    })
    return list
  }
}

RoleAuth.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  roleId:{
    type:Sequelize.INTEGER,
  },
  authId:{
    type:Sequelize.INTEGER,
  },
},{
  sequelize,
  tableName:'roleAuth'
})

module.exports = {
  RoleAuth
}