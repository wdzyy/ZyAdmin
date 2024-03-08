<template>
  <ListPageWrapper>
    <template #default>
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="data"
            fixed
            :height="height"
            :width="width"
          />
        </template>
      </el-auto-resizer>
    </template>
    <template #foot>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </template>
  </ListPageWrapper>
</template> 

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { type Column } from 'element-plus'
enum FixedDir {
  LEFT = 'left',
  RIGHT = 'right',
}

const fixedColumns = ref<Column[]>([
  {
    title: '所在车间',
    key: 'orgId',
    dataKey: 'orgId',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '所在班组',
    key: 'classId',
    dataKey: 'classId',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '工号',
    key: 'personId',
    dataKey: 'personId',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '姓名',
    key: 'name',
    dataKey: 'name',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '款号',
    key: 'productCode',
    dataKey: 'productCode',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '工序号',
    key: 'processCode',
    dataKey: 'processCode',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '工序名称',
    key: 'processName',
    dataKey: 'processName',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '单价',
    key: 'price',
    dataKey: 'price',
    width: 100,
    fixed: FixedDir.LEFT
  },
  {
    title: '日期',
    key: 'date',
    dataKey: 'date',
    width: 100,
    fixed: FixedDir.LEFT
  }
])
const dynamicColumns = ref<Column[]>([])
const data = ref([
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨丹丹',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '产量',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨丹丹',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '产量',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  },
  {
    orgId: '前制车间',
    classId: '前制班组',
    personId: '0001',
    name: ' 杨一样',
    productCode: '20240126',
    processCode: '871',
    processName: '打拉链拌套结*1',
    price: '0.8',
    date: '总价',
    day1709704657: '10',
    day1709704670: '11'
  }
])
const columns = computed(() => {
  return [...fixedColumns.value, ...dynamicColumns.value]
})

// 或缺当前日期，并生成动态列
const getDynamicColumns = async () => {
  const date = new Date()
  const day = date.getDate()
  for (let i = 1; i <= day; i++) {
    dynamicColumns.value.push({
      title: `${date.getMonth() + 1}月${i}日`,
      dataKey: `day${i}`,
      width: 100,
      key: i + ''
    })
  }
}
onMounted(() => {
  getDynamicColumns()
})

</script>
<style scoped lang="scss">
</style>
