<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入组件
const UserDialog = defineAsyncComponent(() => import('@/views/system/user/dialog.vue'))

// 定义变量内容
const userDialogRef = ref()
const state = reactive<SysUserState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10,
    },
  },
})

// 初始化表格数据
function getTableData() {
  state.tableData.loading = true
  const data = []
  for (let i = 0; i < 2; i++) {
    data.push({
      userName: i === 0 ? 'admin' : 'test',
      userNickname: i === 0 ? '我是管理员' : '我是普通用户',
      roleSign: i === 0 ? 'admin' : 'common',
      department: i === 0 ? ['ZyAdmin', 'IT外包服务'] : ['ZyAdmin', '资本控股'],
      phone: '12345678910',
      email: 'ZyAdmin@123.com',
      sex: '女',
      password: '123456',
      overdueTime: new Date(),
      status: true,
      describe: i === 0 ? '不可删除' : '测试用户',
      createTime: new Date().toLocaleString(),
    })
  }
  state.tableData.data = data
  state.tableData.total = state.tableData.data.length
  setTimeout(() => {
    state.tableData.loading = false
  }, 500)
}
// 打开新增用户弹窗
function onOpenAddUser(type: string) {
  userDialogRef.value.openDialog(type)
}
// 打开修改用户弹窗
function onOpenEditUser(type: string, row: RowUserType) {
  userDialogRef.value.openDialog(type, row)
}
// 删除用户
function onRowDel(row: RowUserType) {
  ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      getTableData()
      ElMessage.success('删除成功')
    })
    .catch(() => { })
}
// 分页改变
function onHandleSizeChange(val: number) {
  state.tableData.param.pageSize = val
  getTableData()
}
// 分页改变
function onHandleCurrentChange(val: number) {
  state.tableData.param.pageNum = val
  getTableData()
}
// 页面加载时
onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="system-user-container layout-padding">
    <el-card class="layout-padding-auto" shadow="hover">
      <div class="system-user-search mb-15px">
        <el-input placeholder="请输入用户名称" size="default" style="max-width: 180px" />
        <el-button class="ml-10px" size="default" type="primary">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button class="ml-10px" size="default" type="success" @click="onOpenAddUser('add')">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增用户
        </el-button>
      </div>
      <el-table v-loading="state.tableData.loading" :data="state.tableData.data" style="width: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="账户名称" prop="userName" show-overflow-tooltip />
        <el-table-column label="用户昵称" prop="userNickname" show-overflow-tooltip />
        <el-table-column label="关联角色" prop="roleSign" show-overflow-tooltip />
        <el-table-column label="部门" prop="department" show-overflow-tooltip />
        <el-table-column label="手机号" prop="phone" show-overflow-tooltip />
        <el-table-column label="邮箱" prop="email" show-overflow-tooltip />
        <el-table-column label="用户状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">
              启用
            </el-tag>
            <el-tag v-else type="info">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户描述" prop="describe" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
              @click="onOpenEditUser('edit', scope.row)">
              修改
            </el-button>
            <el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary"
              @click="onRowDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="state.tableData.param.pageNum" v-model:page-size="state.tableData.param.pageSize" background
        class="mt-15px" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]"
        :pager-count="5" :total="state.tableData.total" @current-change="onHandleCurrentChange"
        @size-change="onHandleSizeChange" />
    </el-card>
    <UserDialog ref="userDialogRef" @refresh="getTableData()" />
  </div>
</template>

<style scoped lang="scss">
.system-user-container {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .el-table {
      flex: 1;
    }
  }
}
</style>
