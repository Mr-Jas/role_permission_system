const {Sequelize,Model} = require('sequelize')
// const {unset,clone,isArray} = require('lodash')
const {
  dbName,
  host,
  port,
  user,
  password,
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password, {
  dialect:'mysql',
  host,
  port,
  pool:{
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
  logging:true, //每次操作数据库会把原始sql语句打印出来,
  timezone:'+08:00',  //设置时区跟北京时间一样
  define:{
    timestamps:true,  //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    paranoid:true,    //使用逻辑删除。设置为true后，调用 destroy 方法时将不会删队模型，而是设置一个 deletedAt 列。此设置需要 timestamps=true
    createdAt:'created_at', //将createdAt字段名修改为created_at字段名
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored:true, //转换列名的驼峰命名规则为下划线命令规则
    freezeTableName:true, //禁用修改表名
    scopes:{
      bh:{
        attributes:{
          exclude:['created_at','updated_at','deleted_at'] 
        }
      }
    }
  }
})

sequelize.sync()  //如果有表，保持不变
// sequelize.sync({force:true})  //先删表再建表

// Model.prototype.toJSON = function () {   //JSON序列化的其中一种方法 toJSON方法
//   let data = clone(this.dataValues)
//   unset(data,'updated_at')
//   unset(data,'created_at')
//   unset(data,'deleted_at')

//   for (const key in data) {
//     if(key === 'image'){
//       if(!data[key].startsWith('http')){
//         data[key] = global.config.host + data[key]
//       }
//     }
//   }

//   if(isArray(this.exclude)){
//     this.exclude.forEach(val => {
//       unset(data,value)
//     });
//   }
//   return data
// }

module.exports = {
  sequelize
}