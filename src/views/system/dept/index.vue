<script setup lang="ts" name="systemDept">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入组件
const DeptDialog = defineAsyncComponent(() => import('@/views/system/dept/dialog.vue'))

// 定义变量内容
const deptDialogRef = ref()
const state = reactive<SysDeptState>({
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
  state.tableData.data = []
  state.tableData.data.push({
    deptName: 'vueNextZyAdminAdmin',
    createTime: new Date().toLocaleString(),
    status: true,
    sort: Math.random(),
    describe: '顶级部门',
    id: Math.random(),
    children: [
      {
        deptName: 'IT外包服务',
        createTime: new Date().toLocaleString(),
        status: true,
        sort: Math.random(),
        describe: '总部',
        id: Math.random(),
      },
      {
        deptName: '资本控股',
        createTime: new Date().toLocaleString(),
        status: true,
        sort: Math.random(),
        describe: '分部',
        id: Math.random(),
      },
    ],
  })
  state.tableData.total = state.tableData.data.length
  setTimeout(() => {
    state.tableData.loading = false
  }, 500)
}
// 打开新增菜单弹窗
function onOpenAddDept(type: string) {
  deptDialogRef.value.openDialog(type)
}
// 打开编辑菜单弹窗
function onOpenEditDept(type: string, row: DeptTreeType) {
  deptDialogRef.value.openDialog(type, row)
}
// 删除当前行
function onTabelRowDel(row: DeptTreeType) {
  ElMessageBox.confirm(`此操作将永久删除部门：${row.deptName}, 是否继续?`, '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      getTableData()
      ElMessage.success('删除成功')
    })
    .catch(() => { })
}
// 页面加载时
onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="layout-padding system-dept-container">
    <el-card class="layout-padding-auto" shadow="hover">
      <div class="system-dept-search mb-15px">
        <el-input placeholder="请输入部门名称" size="default" style="max-width: 180px" />
        <el-button class="ml-10px" size="default" type="primary">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button class="ml-10px" size="default" type="success" @click="onOpenAddDept('add')">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增部门
        </el-button>
      </div>
      <el-table v-loading="state.tableData.loading" :data="state.tableData.data" default-expand-all row-key="id"
        style="width: 100%" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column label="部门名称" prop="deptName" show-overflow-tooltip />
        <el-table-column label="排序" show-overflow-tooltip width="80">
          <template #default="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="部门状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">
              启用
            </el-tag>
            <el-tag v-else type="info">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="部门描述" prop="describe" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="操作" show-overflow-tooltip width="140">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenAddDept('add')">
              新增
            </el-button>
            <el-button size="small" text type="primary" @click="onOpenEditDept('edit', scope.row)">
              修改
            </el-button>
            <el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <DeptDialog ref="deptDialogRef" @refresh="getTableData()" />
  </div>
</template>
