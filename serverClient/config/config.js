module.exports = {
  env: 'dev',  //dev prod
  database: {
    dbName: 'testpro',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  },
  security:{
    secretKey:'lsdkjfwojew',
    expiresIn:60*60*2  //过期时间
  },
  // host:'http://localhost:8888/',

}