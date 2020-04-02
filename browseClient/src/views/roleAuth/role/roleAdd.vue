<template>
  <div>
    <el-button type="primary" @click="openDialog">添加角色</el-button>
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" size="large">
        <el-form-item prop="role">
          <el-input v-model="roleForm.role" placeholder="角色" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" :loading="btnLoad" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const roleReg = /[\u4e00-\u9fa5]{2,10}/
    const roleValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('角色不能为空'))
      }
      if (!roleReg.test(value)) {
        return callback(new Error('角色名称格式不正确(仅允许2-10个中文)'))
      }
      callback()
    }
    return {
      rules: {
        role: [{ validator: roleValidator, trigger: 'blur' }]
      },
      addRoleDialog: false,
      roleForm: {
        role: ''
      },
      btnLoad: false
    }
  },
  methods: {
    openDialog() {
      this.addRoleDialog = true
      this.roleForm = {
        role: ''
      }
      this.$nextTick(() => {
        this.$refs.roleForm.clearValidate()
      })
    },

    close() {
      this.addRoleDialog = false
      this.btnLoad = false
    },

    handleClose(done) {
      this.btnLoad = false
      done()
    },

    submit() {
      this.btnLoad = true
      this.$refs.roleForm.validate(valid => {
        if (!valid) {
          this.btnLoad = false
          return
        }
        this.$store.dispatch('role/roleAdd', this.roleForm)
          .then(res => {
            this.btnLoad = false
            if (res.code === 0) {
              this.$message.success(res.msg)
            } else {
              this.$message.warning(res.msg)
            }
          })
          .catch(() => {
            this.btnLoad = false
            this.$message.warning('出现错误，请重试')
          })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/.el-dialog__body {
  padding: 15px 20px;
}
/deep/.el-form-item {
  margin-bottom: 0;
}
</style>
