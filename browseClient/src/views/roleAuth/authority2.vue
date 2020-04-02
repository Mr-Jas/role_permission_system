<template>
  <div class="app-container">
    <el-button v-auth="'权限.创建'" type="primary" @click="openDialog('create')">添加权限</el-button>
    <!-- 表格 -->
    <el-table :data="table" stripe border class="margin-tb">
      <el-table-column prop="id" label="权限ID" />
      <el-table-column prop="moduleName" label="模块名" />
      <el-table-column prop="operateName" label="操作名" />
      <el-table-column prop="method" label="方法名" />
      <el-table-column prop="interface" label="接口路径" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button v-auth="'权限.编辑'" type="primary" size="mini" @click="openDialog('edit',scope.row)">编辑</el-button>
          <el-button v-auth="'权限.删除'" type="danger" size="mini" @click="delRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      :title="type==='create'?'添加权限':'编辑权限'"
      :visible.sync="dialog"
      width="450px"
      :before-close="handleClose"
      :model="form"
    >
      <el-row :gutter="10">
        <el-col :span="12">
          <el-select v-model="form.moduleId" placeholder="选择模块" :disabled="type==='edit'">
            <el-option v-for="item in modules" :key="item.id" :label="item.moduleName" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="form.operateId" placeholder="选择操作" :disabled="type==='edit'">
            <el-option v-for="item in operates" :key="item.id" :label="item.operateName" :value="item.id" />
          </el-select>
        </el-col>
      </el-row>
      <el-input v-model="form.url" placeholder="输入接口路径" clearable class="input-with-select">
        <el-select slot="prepend" v-model="form.method" placeholder="选择方法">
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
        </el-select>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submit('edit')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getModules, getOperates, addAuth, getAuths, updateAuth, deleteAuth } from '@/api/authority'
export default {
  data() {
    return {
      table: [],
      dialog: false,
      type: '', // create edit
      modules: [],
      operates: [],
      form: {
        moduleId: null,
        operateId: null,
        method: null,
        url: null
      }
    }
  },
  async created() {
    await this.getAuths()
  },
  methods: {
    initForm() {
      setTimeout(() => {
        this.form = {
          moduleId: null,
          operateId: null,
          method: null,
          url: null
        }
      }, 300)
    },
    validateForm() {
      if (this.form.moduleId == null) {
        this.$message.warning('请选择模块')
        return false
      }
      if (this.form.operateId == null) {
        this.$message.warning('请选择操作')
        return false
      }
      if (this.form.method == null) {
        this.$message.warning('请选择方法')
        return false
      }
      if (this.form.url == null) {
        this.$message.warning('请输入接口路径')
        return false
      }
      const reg = /^(\/[a-zA-Z0-9]+)+$/
      if (!reg.test(this.form.url)) {
        this.$message.warning('请正确格式的接口路径,例如 /v1/article')
        return false
      }
      return true
    },
    async getAuths() {
      const res = await getAuths()
      this.table = res.data
    },
    async getOptions() {
      const res = await Promise.all([getModules(), getOperates()])
      this.modules = res[0].data
      this.operates = res[1].data
    },
    async openDialog(val, row) {
      this.type = val
      this.dialog = true
      await this.getOptions()
      if (val === 'edit') {
        this.form = {
          id: row.id,
          moduleId: row.moduleId,
          operateId: row.operateId,
          method: row.method,
          url: row.interface
        }
      }
    },
    handleClose(done) {
      this.initForm()
      done()
    },
    cancel() {
      this.initForm()
      this.dialog = false
    },
    async submit() {
      if (!this.validateForm()) return
      let res
      if (this.type === 'create') {
        res = await addAuth(this.form)
      } else {
        res = await updateAuth(this.form)
      }
      if (!res) return
      await this.getAuths()
      this.initForm()
      this.dialog = false
    },
    async delRole(row) {
      this.$confirm('确定删除该权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log(row.id)
        const res = await deleteAuth({ id: row.id })
        if (res) {
          await this.getAuths()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .input-with-select{
    margin-top: 20px
  }
  /deep/.input-with-select .el-input-group__prepend {
    width: 110px;
    background-color: #fff;
  }
  /deep/.el-dialog__body {
    padding: 15px 20px;
  }
  /deep/.el-form-item:last-child {
    margin-bottom: 0;
  }
</style>
