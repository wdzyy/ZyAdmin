<script setup lang="ts" name="systemDic">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入组件
const DicDialog = defineAsyncComponent(() => import('@/views/system/dic/dialog.vue'))

// 定义变量内容
const dicDialogRef = ref()
const state = reactive<SysDicState>({
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
      dicName: i === 0 ? '角色标识' : '用户性别',
      fieldName: i === 0 ? 'SYS_ROLE' : 'SYS_UERINFO',
      describe: i === 0 ? '这是角色字典' : '这是用户性别字典',
      status: true,
      createTime: new Date().toLocaleString(),
      list: [],
    })
  }
  state.tableData.data = data
  state.tableData.total = state.tableData.data.length
  setTimeout(() => {
    state.tableData.loading = false
  }, 500)
}
// 打开新增字典弹窗
function onOpenAddDic(type: string) {
  dicDialogRef.value.openDialog(type)
}
// 打开修改字典弹窗
function onOpenEditDic(type: string, row: RowDicType) {
  dicDialogRef.value.openDialog(type, row)
}
// 删除字典
function onRowDel(row: RowDicType) {
  ElMessageBox.confirm(`此操作将永久删除字典名称：“${row.dicName}”，是否继续?`, '提示', {
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
        <el-input placeholder="请输入字典名称" size="default" style="max-width: 180px" />
        <el-button class="ml-10px" size="default" type="primary">
          <el-icon>
            <ele-Search />
          </el-icon>
          查询
        </el-button>
        <el-button class="ml-10px" size="default" type="success" @click="onOpenAddDic('add')">
          <el-icon>
            <ele-FolderAdd />
          </el-icon>
          新增字典
        </el-button>
      </div>
    </template>
    <template #default>
      <el-table v-loading="state.tableData.loading" :data="state.tableData.data" style="height: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column label="字典名称" prop="dicName" show-overflow-tooltip />
        <el-table-column label="字段名" prop="fieldName" show-overflow-tooltip />
        <el-table-column label="字典状态" prop="status" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="success">
              启用
            </el-tag>
            <el-tag v-else type="info">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="字典描述" prop="describe" show-overflow-tooltip />
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onOpenEditDic('edit', scope.row)">
              修改
            </el-button>
            <el-button size="small" text type="primary" @click="onRowDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <DicDialog ref="dicDialogRef" @refresh="getTableData()" />
    </template>
    <template #foot>
      <el-pagination v-model:current-page="state.tableData.param.pageNum" v-model:page-size="state.tableData.param.pageSize" background
        class="mt-15px" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]"
        :pager-count="5" :total="state.tableData.total" @current-change="onHandleCurrentChange"
        @size-change="onHandleSizeChange" />
    </template>
  </ListPageWrapper>
</template>
