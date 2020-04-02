const { LinValidator, Rule } = require('../../core/lin-validator-v2')

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('matches', '输入不符合规范', '^[a-zA-Z0-9_-]{4,16}$')
    ]
    this.pass = [
      new Rule('isLength', '至少6个字符，最多16个字符', {
        min: 6,
        max: 16
      }),
      new Rule('matches', '至少包含 数字和英文，长度6-16', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$')
    ]
    this.roleId = [
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
  }
}

class RoleValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isOptional'),
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
    this.roleName = [
      new Rule('matches', '名称格式不正确(仅允许2-10个中文)', '^[\u4e00-\u9fa5]{2,10}$')
    ]
  }
}

class UsernamePwdValidator extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('matches', '输入不符合规范', '^[a-zA-Z0-9_-]{4,16}$')
    ]

    this.password = [
      new Rule('matches', '至少包含 数字和英文，长度6-16', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$')
    ]
  }
}

class AuthorityValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isOptional'),
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
    this.moduleId = [
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
    this.operateId = this.moduleId
  }
  validateMethod(vals) {
    const method = vals.body.method
    const methods = ["GET", "POST", "PUT", "DELETE"]
    if (!methods.includes(method)) {
      throw new Error('方法不符合规范')
    }
  }
  validateInterface(vals) {
    const url = vals.body.url
    const reg = /^(\/[a-zA-Z0-9]+)+$/
    if (!reg.test(url)) {
      throw new Error('接口路径不符合规范')
    }
  }
}

class PasswordValidator extends LinValidator {
  constructor() {
    super()
    this.pass = [
      new Rule('matches', '至少包含 数字和英文，长度6-16', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$')
    ]
    this.checkPass = this.pass
  }
  validatePassword(vals) {
    const psw1 = vals.body.pass
    const psw2 = vals.body.checkPass
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }
}

class RoleAuthValidator extends LinValidator {
  constructor() {
    super()
    this.roleId = [
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
  }
  validateAuth(vals) {
    if (vals.body.auths instanceof Array) {
      if (vals.body.auths.length>0) {
        vals.body.auths.forEach(item => {
          if (typeof item != 'number') {
            throw new Error('数组元素必须为整型')
          }
        });
      }
    }else{
      throw new Error('auths必须为数组')
    }
  }
}

class IdValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '仅能为大于0的整型数字', {min:1})
    ]
  }
}

class TokenValidator extends LinValidator{
  constructor(){
    super()
    this.token = [new Rule('isLength','token不允许为空',{min:1})]
  }
}


module.exports = {
  RegisterValidator,
  RoleValidator,
  UsernamePwdValidator,
  AuthorityValidator,
  PasswordValidator,
  RoleAuthValidator,
  IdValidator,
  TokenValidator
}