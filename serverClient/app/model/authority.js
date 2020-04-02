const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Module } = require('./module')
const { Operate } = require('./operate')

class Authority extends Model {
  static async addAuth(auth) {
    let res = await Authority.findOne({
      where: {
        moduleId: auth.moduleId,
        operateId: auth.operateId
      }
    })
    if (res) {
      throw new global.errs.ResourceExist('该模块操作已绑定接口')
    }
    res = await Authority.findOne({
      where: {
        method: auth.method,
        interface: auth.interface
      }
    })
    if (res) {
      throw new global.errs.ResourceExist('该接口已绑定模块操作')
    }
    await Authority.create(auth)
    throw new global.errs.Success()
  }

  static async getAuthList() {
    const authList = await Authority.scope('bh').findAll()
    if (!authList) {
      throw new global.errs.Success('暂无任何权限', 20002)
    }
    const modules = await Module.scope('bh').findAll()
    const operates = await Operate.scope('bh').findAll()
    authList.forEach(item => {
      modules.forEach(ele => {
        if (ele.id === item.moduleId) {
          item.setDataValue('moduleName', ele.moduleName)
        }
      })
      operates.forEach(ele => {
        if (ele.id === item.operateId) {
          item.setDataValue('operateName', ele.operateName)
        }
      })
    })
    return authList
  }

  static async updateAuth(auth) {
    const res = await Authority.findOne({
      where: {
        id: {
          [Op.ne]: auth.id
        },
        method: auth.method,
        interface: auth.interface,
      }
    })
    console.log(res)
    if (res) {
      throw new global.errs.ResourceExist('该接口已绑定模块操作')
    }
    await Authority.update({
      method: auth.method,
      interface: auth.interface,
    }, {
      where: {
        id: auth.id
      }
    })
    throw new global.errs.Success()
    // console.log(auth)
    // if (auth.isMenu) {
    //   const authList = await Authority.findAll({
    //     where: {
    //       id: {
    //         [Op.ne]: auth.id
    //       },
    //       isMenu: true
    //     }
    //   })
    //   authList.forEach(item => {
    //     if (item.authorityName === auth.authorityName) {
    //       throw new global.errs.ResourceExist('菜单名已存在')
    //     }
    //     if (item.interface === auth.interface) {
    //       throw new global.errs.ResourceExist('菜单地址已存在')
    //     }
    //   })
    //   const res = await Authority.update({
    //     authorityName: auth.authorityName,
    //     interface: auth.interface,
    //   }, {
    //     where: {
    //       id: auth.id
    //     }
    //   })
    //   if (res) { throw new global.errs.Success() }
    // } else {

    // }
  }

  static async deleteAuth(authId){
    const { RoleAuth } = require('./roleAuth')
    let res = await RoleAuth.findOne({
      where: {
        authId
      }
    })
    if(res){
      throw new global.errs.ResourceExist('该权限已绑定角色，请解除绑定再删除。')
    }
    res = await Authority.destroy({ 
      force: true ,
      where: {
        id:authId
      }
    })
    if(res){
      throw new global.errs.Success()
    }
  }
}

Authority.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  moduleId: {
    type: Sequelize.INTEGER,
  },
  operateId: {
    type: Sequelize.INTEGER,
  },
  interface: {
    type: Sequelize.STRING,
  },
  method: {
    type: Sequelize.STRING,
  },

}, {
  sequelize,
  tableName: 'authority'
})

// Authority.sync().then(() => {
//   Authority.bulkCreate([
//     { moduleId: 1, operateId: 1, interface: '/icon', method: 'GET' },
//     { moduleId: 2, operateId: 1, interface: '/v1/user', method: 'GET' },
//     { moduleId: 2, operateId: 2, interface: '/v1/user', method: 'POST' },
//     { moduleId: 2, operateId: 5, interface: '/v1/user/password ', method: 'PUT' },
//     { moduleId: 2, operateId: 6, interface: '/v1/user/role', method: 'PUT' },
//     { moduleId: 2, operateId: 4, interface: '/v1/user', method: 'DELETE' },
//     { moduleId: 3, operateId: 1, interface: '/v1/role', method: 'GET' },
//     { moduleId: 3, operateId: 2, interface: '/v1/role', method: 'POST' },
//     { moduleId: 3, operateId: 3, interface: '/v1/role', method: 'PUT' },
//     { moduleId: 3, operateId: 4, interface: '/v1/role', method: 'DELETE' },
//     { moduleId: 4, operateId: 1, interface: '/v1/authority', method: 'GET' },
//     { moduleId: 4, operateId: 2, interface: '/v1/authority', method: 'POST' },
//     { moduleId: 4, operateId: 3, interface: '/v1/authority', method: 'PUT' },
//     { moduleId: 4, operateId: 4, interface: '/v1/authority', method: 'DELETE' },
//   ])
// })

module.exports = {
  Authority
}