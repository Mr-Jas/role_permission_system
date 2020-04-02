<template>
  <div class="tableBox">
    <el-table :data="$store.getters.roleTable" stripe border height="0">
      <el-table-column prop="id" label="角色ID" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openUpdate(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改角色"
      :visible.sync="dialog"
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
      tableData: [],
      checkedCities: [],

      rules: {
        role: [{ validator: roleValidator, trigger: 'blur' }]
      },
      dialog: false,
      roleForm: {
        id: '',
        role: ''
      },
      btnLoad: false
    }
  },
  created() {
    this.$store.dispatch('role/getRoleList')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    openUpdate(row) {
      this.dialog = true
      this.roleForm.id = row.id
      this.roleForm.role = row.roleName
      this.$nextTick(() => {
        this.$refs.roleForm.clearValidate()
      })
    },

    close() {
      this.dialog = false
      this.btnLoad = false
    },

    handleClose(done) {
      this.btnLoad = false
      done()
    },

    submit() {
      this.$refs.roleForm.validate(valid => {
        this.btnLoad = true
        if (!valid) {
          this.btnLoad = false
          return
        }
        this.$store.dispatch('role/roleUpdate', this.roleForm)
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
