<template>
  <div class="tableBox">
    <!-- 账号列表 -->
    <el-table :data="userTable" stripe border>
      <el-table-column prop="id" label="账号ID" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button v-auth="'用户.密码修改'" type="primary" size="mini" @click="openDialog(scope.row)">密码修改</el-button>
          <el-button v-if="scope.row.id!=1" v-auth="'用户.角色修改'" type="primary" size="mini" @click="openRoleDialog(scope.row)">角色修改</el-button>
          <el-button v-if="scope.row.id!=1" v-auth="'用户.删除'" type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 密码修改dialog -->
    <el-dialog
      title="修改密码"
      :visible.sync="userDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="true"
    >
      <el-form ref="userForm" :model="userForm" :rules="rules" size="large">
        <el-form-item prop="account">
          <el-input v-model="userForm.account" placeholder="账户" disabled />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="userForm.pass" type="password" placeholder="新密码" />
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input v-model="userForm.checkPass" type="password" placeholder="确认密码" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" :loading="btnLoad" @click="updatePwd()">修改</el-button>
      </span>
    </el-dialog>

    <!-- 角色修改dialog -->
    <el-dialog
      title="角色修改"
      :visible.sync="roleDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="true"
    >
      <el-select v-model="roleId" placeholder="请选择">
        <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id" />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsersInfo, updatePassword, updateRole, delUser } from '@/api/user'
import { getRoleList } from '@/api/role'
export default {
  data() {
    const userReg = /^[a-zA-Z0-9_-]{4,16}$/
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
        if (this.userForm.checkPass !== '') {
          this.$refs.userForm.validateField('checkPass')
          return callback()
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userTable: [],

      userForm: {
        id: '',
        account: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        account: [{ validator: checkAccount, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      userDialog: false,
      btnLoad: false,

      roleDialog: false,
      options: [], // select的选项
      roleId: '', // select选择的值
      userId: '' // 打开roleDialog传的用户id
    }
  },
  async created() {
    this.$eventBus.$on('update', async data => {
      await this.getUsersInfo()
    })
    await this.getUsersInfo()
  },
  methods: {
    async getUsersInfo() {
      const res = await getUsersInfo()
      if (res) this.userTable = res.data
    },
    openDialog(row) {
      this.userDialog = true
      this.userForm = {
        id: row.id,
        account: row.account,
        pass: '',
        checkPass: ''
      }
      this.$nextTick(() => {
        this.$refs.userForm.clearValidate()
      })
    },
    updatePwd() {
      this.btnLoad = true
      this.$refs.userForm.validate(async valid => {
        if (!valid) {
          this.btnLoad = false
          return
        }
        const res = await updatePassword(this.userForm)
        if (res) {
          this.close()
          this.$message.success(res.data)
        } else {
          this.btnLoad = false
        }
      })
    },
    close() {
      this.userDialog = false
      this.roleDialog = false
      this.btnLoad = false
    },
    handleClose(done) {
      this.btnLoad = false
      done()
    },

    async openRoleDialog(row) {
      this.roleDialog = true
      await this.getOptions()
      this.roleId = row.roleId
      this.userId = row.id
    },
    async getOptions() {
      const res = await getRoleList()
      if (res) this.options = res.data
    },
    async updateRole() {
      this.btnLoad = true
      const res = await updateRole({
        userId: this.userId,
        roleId: this.roleId
      })
      if (res) {
        this.roleDialog = false
        this.btnLoad = false
        this.$message.success(res.data)
        await this.getUsersInfo()
      } else {
        this.btnLoad = false
      }
    },
    del(row) {
      this.$confirm('确定删除该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await delUser({ id: row.id })
          if (res) {
            await this.getUsersInfo()
          }
        })
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
