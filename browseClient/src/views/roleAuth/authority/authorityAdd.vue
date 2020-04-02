<template>
  <div>
    <el-button type="primary" @click="openAdd">添加权限</el-button>
    <el-dialog
      title="添加权限"
      :visible.sync="addDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="addForm" :model="addForm" size="large" :rules="rules" label-position="left">
        <el-form-item prop="isMenu" label-width="50px" label="类型:">
          <el-switch
            v-model="addForm.isMenu"
            inactive-color="#409EFF"
            active-color="#409EFF"
            inactive-text="接口"
            active-text="菜单"
          />
        </el-form-item>
        <el-form-item prop="authorityName">
          <el-input v-model="addForm.authorityName" placeholder="接口名/菜单名" />
        </el-form-item>
        <el-form-item prop="interface">
          <el-input v-model="addForm.interface" placeholder="接口地址/菜单地址(例:/list/article)" />
        </el-form-item>
        <el-form-item v-if="!addForm.isMenu" prop="method" label-width="50px" label="方法:">
          <el-radio-group v-model="method" size="small">
            <el-radio-button label="GET">Get</el-radio-button>
            <el-radio-button label="POST">Post</el-radio-button>
            <el-radio-button label="PUT">Put</el-radio-button>
            <el-radio-button label="DELETE">Delete</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :loading="btnLoad" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const checkName = (rule, value, callback) => {
      const reg = /[\u4e00-\u9fa5]{2,10}/
      if (!value) {
        return callback(new Error('权限/菜单名不能为空'))
      }
      if (!reg.test(value)) {
        return callback(
          new Error('格式不正确(仅允许2-10个中文)')
        )
      }
      callback()
    }
    const checkInterface = (rule, value, callback) => {
      const reg = /^(\/[a-zA-Z]+)+$/
      if (!value) {
        return callback(new Error('接口/菜单不能为空'))
      }
      if (!reg.test(value)) {
        return callback(
          new Error('接口/菜单输入不符合规范')
        )
      }
      callback()
    }
    return {
      rules: {
        authorityName: [{ validator: checkName, trigger: 'blur' }],
        interface: [{ validator: checkInterface, trigger: 'blur' }]
      },
      addForm: {
        isMenu: false,
        authorityName: '',
        interface: ''
      },
      method: 'GET',

      addDialog: false,
      btnLoad: false
    }
  },
  methods: {
    openAdd() {
      this.addDialog = true
      this.addForm = {
        isMenu: false,
        authorityName: '',
        interface: ''
      }
      this.method = 'GET'
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    submit() {
      this.$refs.addForm.validate(valid => {
        if (!this.addForm.isMenu) {
          this.addForm.method = this.method
        } else {
          delete this.addForm.method
        }
        this.btnLoad = true
        if (!valid) {
          this.btnLoad = false
          return
        }
        this.$store.dispatch('authority/authorityAdd', this.addForm)
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
    },

    close() {
      this.addDialog = false
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
