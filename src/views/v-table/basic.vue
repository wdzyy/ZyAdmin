<template>
  <div class="system-user-container layout-padding">
    <el-card class="layout-padding-auto" shadow="hover">
      <el-table-v2
        :columns="columns"
        :data="data"
        :height="400"
        :width="700"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const fixedColumns = ref([
  {
    title: '所在车间',
    key: 'orgId',
    dataKey: 'orgId',
    fixed: 'left'
  },
  {
    title: '所在班组',
    key: 'classId',
    dataKey: 'classId',
    fixed: 'left'
  },
  {
    title: '工号',
    key: 'personId',
    dataKey: 'personId',
    fixed: 'left'
  },
  {
    title: '姓名',
    key: 'name',
    dataKey: 'name',
    fixed: 'left'
  },
  {
    title: '款号',
    key: 'productCode',
    dataKey: 'productCode',
    fixed: 'left'
  },
  {
    title: '工序号',
    key: 'processCode',
    dataKey: 'processCode',
    fixed: 'left'
  },
  {
    title: '工序名称',
    key: 'processName',
    dataKey: 'processName',
    fixed: 'left'
  },
  {
    title: '单价',
    key: 'price',
    dataKey: 'price',
    fixed: 'left'
  },
  {
    title: '日期',
    key: 'date',
    dataKey: 'date',
    fixed: 'left'
  }
])
const dynamicColumns = ref([
  {
    title: '1月1日',
    dataKey: '1-1',
    key: '1-1'
  },
  {
    title: '1月2日',
    dataKey: '1-2',
    key: '1-2'
  },
])
const data = ref([
  {
    orgId: '1',
    classId: '2',
    personId: '3',
    name: '4',
    productCode: '5',
    processCode: '6',
    processName: '7',
    price: '8',
    date: '9',
    '1-1': '10',
    '1-2': '11'
  }
])
const columns = computed(() => {
  return [...fixedColumns.value, ...dynamicColumns.value]
})
</script>
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
