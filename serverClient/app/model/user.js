const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Role } = require('./role')
const { RoleAuth } = require('./roleAuth')
const { Authority } = require('./authority')
const jwt = require('jsonwebtoken')

class User extends Model {
  static async checkRegister(account) {
    const user = await User.findOne({
      where: {
        account
      }
    })
    if (user) {
      throw new global.errs.ResourceExist('账号已存在')
    }
  }

  static async verifyAcountPassword(account, plainPassword) {
    const user = await User.scope('bh').findOne({
      where: {
        account
      }
    })
    if (!user) {
      throw new global.errs.Success('账号或密码错误', 20001)
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.Success('账号或密码错误', 20001)
    }
    return user
  }

  //获取登录者信息
  static async getUserInfo(token) {
    const decode = jwt.verify(token,global.config.security.secretKey)
    let authList = [],role = ''
    const auths = await Authority.getAuthList()
    if (decode.id === 1) {  //userid为1的用户 赋予所有权限
      auths.forEach(auth =>{
        authList.push(auth.getDataValue('moduleName')+'.'+auth.getDataValue('operateName'))
      })
    } else {  //userid不为1的用户 根据角色赋予权限
      role = await Role.findOne({
        where:{
          id:decode.roleId
        }
      })
      const roleAuths = await RoleAuth.findAll({
        where:{
          roleId:decode.roleId
        }
      })
      roleAuths.forEach(roleAuth =>{
        auths.forEach(auth =>{
          if (roleAuth.authId === auth.id) {
            authList.push(auth.getDataValue('moduleName')+'.'+auth.getDataValue('operateName'))
          }
        })
      })
    }
    
    if (!role) role={roleName:'superAdmin'}
    const user = {
      roles: [role.roleName],
      auth: authList,
      avatar: 'https://img.zcool.cn/community/0116525746ac756ac72525ae08edd4.gif',
      name: decode.username
    }
    throw new global.errs.Success(user)
  }

  //获取用户列表
  static async getUserList() {
    const users = await User.scope('bh').findAll({
      attributes: { exclude: ['password'] }
    })
    if (!users) {
      throw new global.errs.Success('系统内没有账号', 20002)
    }
    const roles = await Role.scope('bh').findAll()
    users.forEach(user=>{
      roles.forEach(role=>{
        if(user.roleId === role.id){
          user.setDataValue("roleName",role.roleName)
        }
      })
    })
    return users
  }

  //修改用户密码
  static async updateUserPwd(user){
    const dbUser = await User.findOne({
      where:{
        id:user.id
      }
    })
    const correct = bcrypt.compareSync(user.password,dbUser.password)
    if(correct){
      throw new global.errs.ResourceExist('与原密码相同')
    }

    const res = await User.update({password:user.password},{
      where:{
        id:user.id
      }
    })
    if(res){
      throw new global.errs.Success()
    }
  }

  //修改用户角色
  static async updateUserRole(user){
    const res = await User.update({roleId:user.roleId},{
      where:{
        id:user.id
      }
    })
    if(res){
      throw new global.errs.Success()
    }
  }

  //删除用户
  static async delUser(id){
    const res = await User.destroy({ 
      force: true ,
      where: {
        id
      }
    })
    if(res){
      throw new global.errs.Success()
    }
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pwd)
    }
  },
  roleId: {
    type: Sequelize.INTEGER,
  }
}, {
  sequelize,
  tableName: 'user'
})

// User.sync().then(()=>{
//   User.create({
//     account:'super0',
//     password:'super0'
//   })
// })


module.exports = {
  User
}