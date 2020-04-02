const {Sequelize,Model,Op} = require('sequelize')
const { sequelize } = require('../../core/db')
const { RoleAuth } = require('./roleAuth')

class Role extends Model{
  static async checkRole(roleName){
    const role = await Role.findOne({
      where:{
        roleName
      }
    })
    if(role){
      throw new global.errs.ResourceExist('角色已存在')
    }
  }
  static async addRole(roleName,auths){
    const role = await Role.create({roleName})
    if (role) {
      await RoleAuth.updateRoleAuth(role.id,auths)
      throw new global.errs.Success()
    }
  }

  static async getRoleList(){
    const roles = await Role.scope('bh').findAll()
    if (roles.length===0) {
      throw new global.errs.Success('暂无任何角色',20002)
    }
    const roleAuths = await RoleAuth.scope('bh').findAll()
    roles.forEach(role => {
      let auths =roleAuths.filter(roleAuth => {
        return roleAuth.roleId === role.id
      }).map(roleAuth => {
        return roleAuth.authId
      })
      role.setDataValue('auths',auths)
    })
    return roles
  }
  
  static async updateRole(role){
    const res = await Role.findOne({
      where:{
        id:{
          [Op.ne]:role.id
        },
        roleName:role.roleName
      }
    })
    if (res) {
      throw new global.errs.ResourceExist('角色已存在')
    }
    await Role.update(role,{
      where:{
        id:role.id
      }
    })
    await RoleAuth.updateRoleAuth(role.id,role.auths)
    throw new global.errs.Success()
  }

  static async deleteRole(roleId){
    const { User } = require('./user')
    let res = await User.findOne({
      where:{
        roleId
      }
    })
    if(res){
      throw new global.errs.ResourceExist('该角色已被用户占用，不可删除')
    }
    res = await Role.destroy({ 
      force: true ,
      where: {
        id:roleId
      }
    })
    if(res){
      throw new global.errs.Success()
    }
  }
}

Role.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  roleName:{
    type:Sequelize.STRING,
    unique: true,
  }
},{
  sequelize,
  tableName:'role'
})

// Role.create({
//   roleName:'超级管理员'
// })

module.exports = {
  Role
}