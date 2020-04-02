<template>
  <div class="tableBox">
    <el-table :data="$store.getters.authTable" stripe border height="0">
      <el-table-column prop="id" label="权限ID" />
      <el-table-column prop="authorityName" label="接口/菜单名" />
      <el-table-column prop="interface" label="接口/菜单地址" />
      <el-table-column prop="method" label="方法" />
      <el-table-column label="是否菜单">
        <template slot-scope="scope">
          {{ scope.row.isMenu?"是":"否" }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openUpdate(scope.row)">修改权限</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="修改权限"
      :visible.sync="updateDialog"
      width="350px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form ref="updateForm" :model="updateForm" size="large" :rules="rules" label-position="left">
        <el-form-item prop="isMenu" label-width="50px" label="类型:">
          <el-switch
            v-model="updateForm.isMenu"
            inactive-color="#409EFF"
            active-color="#409EFF"
            inactive-text="接口"
            active-text="菜单"
            disabled
          />
        </el-form-item>
        <el-form-item prop="authorityName">
          <el-input v-model="updateForm.authorityName" placeholder="接口名/菜单名" />
        </el-form-item>
        <el-form-item prop="interface">
          <el-input v-model="updateForm.interface" placeholder="接口地址/菜单地址(例:/list/article)" />
        </el-form-item>
        <el-form-item v-if="!updateForm.isMenu" prop="method" label-width="50px" label="方法:">
          <el-radio-group v-model="updateForm.method" size="small">
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
      updateDialog: false,
      updateForm: {
        id: '',
        authorityName: '',
        interface: '',
        method: '',
        isMenu: ''
      },
      btnLoad: false
    }
  },
  created() {
    this.$store.dispatch('authority/getAuthList')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    openUpdate(row) {
      this.updateDialog = true
      this.updateForm = {
        id: row.id,
        authorityName: row.authorityName,
        interface: row.interface,
        method: row.method,
        isMenu: row.isMenu
      }
      this.$nextTick(() => {
        this.$refs.updateForm.clearValidate()
      })
    },
    close() {
      this.updateDialog = false
      this.btnLoad = false
    },
    handleClose(done) {
      this.updateForm = {
        id: '',
        authorityName: '',
        interface: '',
        method: '',
        isMenu: ''
      }
      this.btnLoad = false
      done()
    },
    submit() {
      this.$refs.updateForm.validate(valid => {
        if (this.updateForm.isMenu) {
          delete this.updateForm.method
        }
        this.btnLoad = true
        if (!valid) {
          this.btnLoad = false
          return
        }
        this.$store.dispatch('authority/authorityUpdate', this.updateForm)
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
.tableBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/deep/.el-dialog__body {
  padding: 15px 20px;
}
/deep/.el-form-item:last-child {
  margin-bottom: 0;
}
</style>
