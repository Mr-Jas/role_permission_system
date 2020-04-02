<template>
  <div>
    <el-button v-auth="'用户.创建'" type="primary" @click="openDialog">添加账户</el-button>
    <el-dialog
      title="添加账户"
      :visible.sync="adduserDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="true"
    >
      <el-form ref="addUserForm" :model="addUserForm" :rules="rules" size="large">
        <el-form-item prop="account">
          <el-input v-model="addUserForm.account" placeholder="账户" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="addUserForm.pass" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input v-model="addUserForm.checkPass" type="password" placeholder="确认密码" />
        </el-form-item>
        <el-form-item prop="roleId">
          <el-select v-model="addUserForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" :loading="btnLoad" @click="submitForm()">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import { addUser } from '@/api/user'
export default {
  data() {
    // 用户名正则，4到16位（字母，数字，下划线，减号）
    const userReg = /^[a-zA-Z0-9_-]{4,16}$/
    // 密码至少包含 数字和英文，长度6-16
    const passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/

    const checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      if (!userReg.test(value)) {
        return callback(
          new Error('账号只允许4到16位（字母，数字，下划线，减号）')
        )
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!passReg.test(value)) {
          return callback(new Error('密码至少包含 数字和英文，长度6-16'))
        }
        if (this.addUserForm.checkPass !== '') {
          this.$refs.addUserForm.validateField('checkPass')
          return callback()
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUserForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      addUserForm: {
        account: '',
        pass: '',
        checkPass: '',
        roleId: ''
      },
      rules: {
        account: [{ validator: checkAccount, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      adduserDialog: false,
      btnLoad: false,

      options: [] // select的选项
    }
  },
  methods: {
    async openDialog() {
      this.adduserDialog = true
      this.$nextTick(() => {
        this.$refs.addUserForm.resetFields()
      })
      await this.getOptions()
    },

    async getOptions() {
      const res = await getRoleList()
      if (res) this.options = res.data
    },

    submitForm() {
      this.$refs.addUserForm.validate(async valid => {
        this.btnLoad = true
        if (!valid) {
          this.btnLoad = false
          return
        }
        const res = await addUser(this.addUserForm)
        if (res) {
          this.$message.success(res.data)
          this.$eventBus.$emit('update', res.data)
          this.close()
        }
      })
    },

    close() {
      this.adduserDialog = false
      this.btnLoad = false
    },

    handleClose(done) {
      this.btnLoad = false
      done()
    }

  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__body {
  padding: 15px 20px;
}
/deep/.el-form-item:last-child {
  margin-bottom: 0;
}
</style>
