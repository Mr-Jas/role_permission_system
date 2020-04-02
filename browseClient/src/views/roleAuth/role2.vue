<template>
  <div class="app-container">
    <el-button v-auth="'角色.创建'" type="primary" @click="openDialog('create')">添加角色</el-button>
    <el-table :data="roleTable" stripe border class="margin-tb">
      <el-table-column prop="id" label="角色ID" />
      <el-table-column prop="roleName" label="角色" />
      <!-- <el-table-column prop="auth" label="权限" /> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button v-auth="'角色.编辑'" type="primary" size="mini" @click="openDialog('edit',scope.row)">编辑</el-button>
          <el-button v-auth="'角色.删除'" type="danger" size="mini" @click="delRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="type==='create'?'添加角色':'编辑角色'"
      :visible.sync="dialog"
      width="450px"
      :before-close="handleClose"
      :model="form"
    >
      <el-form ref="form" size="large" label-position="left" label-width="60px">
        <el-form-item prop="roleName" label="角色">
          <el-input v-model="role.roleName" placeholder="角色" />
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="role.auths">
            <el-checkbox v-for="auth in auths" :key="auth.id" :label="auth.id" style="width:8rem">{{ auth.moduleName }}-{{ auth.operateName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, getRoleList, updateRole, deleteRole } from '@/api/role'
import { getAuths } from '@/api/authority'

export default {
  data() {
    return {
      roleTable: [],
      dialog: false,
      type: '', // create edit
      form: {},
      role: {
        id: '',
        roleName: '',
        auths: []
      },
      auths: []
    }
  },
  async created() {
    await this.getRoleList()
  },
  methods: {
    roleInit() {
      setTimeout(() => {
        this.role = {
          id: '',
          roleName: '',
          auths: []
        }
      }, 300)
    },
    validate(roleName) {
      const reg = /^[\u4e00-\u9fa5]{2,10}$/
      if (reg.test(roleName)) {
        return true
      }
      this.$message.warning('角色名不符合格式')
      return false
    },
    async getRoleList() {
      const res = await getRoleList()
      if (res) this.roleTable = res.data
    },
    async openDialog(val, row) {
      this.type = val
      const res = await getAuths()
      if (res) {
        this.auths = res.data
        if (val === 'create') {
          this.dialog = true
        } else {
          this.role = row
          this.dialog = true
        }
      }
    },
    handleClose(done) {
      this.roleInit()
      done()
    },
    cancel() {
      this.roleInit()
      this.dialog = false
    },
    async submit() {
      if (!this.validate(this.role.roleName)) return
      let res
      if (this.type === 'create') {
        res = await addRole(this.role)
      } else {
        res = await updateRole(this.role)
      }
      if (res) {
        this.$message.success(res.data)
        this.cancel()
        await this.getRoleList()
      }
    },
    delRole(row) {
      this.$confirm('确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log(row.id)
        const res = await deleteRole({ id: row.id })
        if (res) {
          await this.getRoleList()
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
