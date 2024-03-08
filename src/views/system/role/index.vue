<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入组件
const RoleDialog = defineAsyncComponent(() => import('@/views/system/role/dialog.vue'))

// 定义变量内容
const roleDialogRef = ref()
const state = reactive<SysRoleState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      search: '',
      pageNum: 1,
      pageSize: 10,
    },
  },
})
// 初始化表格数据
function getTableData() {
  state.tableData.loading = true
  const data = []
  for (let i = 0; i < 20; i++) {
    data.push({
      roleName: i === 0 ? '超级管理员' : '普通用户',
      roleSign: i === 0 ? 'admin' : 'common',
      describe: `测试角色${i + 1}`,
      sort: i,
      status: true,
      createTime: new Date().toLocaleString(),
    })
  }
  state.tableData.data = data
  state.tableData.total = state.tableData.data.length
  setTimeout(() => {
    state.tableData.loading = false
  }, 500)
}
// 打开新增角色弹窗
function onOpenAddRole(type: string) {
  roleDialogRef.value.openDialog(type)
}
// 打开修改角色弹窗
function onOpenEditRole(type: string, row: Object) {
  roleDialogRef.value.openDialog(type, row)
}
// 删除角色
function onRowDel(row: RowRoleType) {
  ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
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
  <ListPageWrapper>
    <template #head>
      <div>
        <el-input v-model="state.tableData.param.search" placeholder="请输入角色名称" size="default" style="max-width: 180px" />
        <el-button class="ml-10px" size="default" type="primary">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button class="ml-10px" size="default" type="success" @click="onOpenAddRole('add')">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增角色
        </el-button>
      </div>
    </template>
    <template #default>
      <el-table v-loading="state.tableData.loading" :data="state.tableData.data" style="height: 100%">
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="角色名称" prop="roleName" show-overflow-tooltip />
        <el-table-column label="角色标识" prop="roleSign" show-overflow-tooltip />
        <el-table-column label="排序" prop="sort" show-overflow-tooltip />
        <el-table-column label="角色状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">
              启用
            </el-tag>
            <el-tag v-else type="info">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色描述" prop="describe" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button :disabled="scope.row.roleName === '超级管理员'" size="small" text type="primary"
              @click="onOpenEditRole('edit', scope.row)">
              修改
            </el-button>
            <el-button :disabled="scope.row.roleName === '超级管理员'" size="small" text type="primary"
              @click="onRowDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <RoleDialog ref="roleDialogRef" @refresh="getTableData()" />
    </template>
    <template #foot>
      <el-pagination v-model:current-page="state.tableData.param.pageNum" v-model:page-size="state.tableData.param.pageSize" background
        class="mt-15px" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]"
        :pager-count="5" :total="state.tableData.total" @current-change="onHandleCurrentChange"
        @size-change="onHandleSizeChange" />
    </template>
  </ListPageWrapper>
</template>

<style scoped lang="scss">
</style>
