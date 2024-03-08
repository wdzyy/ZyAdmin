<script setup lang="ts" name="home">
import { markRaw, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

// 定义变量内容
const barRef = ref()
const state = reactive({
  global: {
    markLineValue: 60,
    homeCharThree: null,
    dispose: [null, '', undefined],
  } as any,
  charts: {
    theme: '',
    bgColor: '',
    color: '#303133',
  },
})

// 柱状图
function initBarChart() {
  if (!state.global.dispose.includes(state.global.homeCharThree))
    state.global.homeCharThree.dispose()
  state.global.homeCharThree = markRaw(echarts.init(barRef.value, state.charts.theme))
  const option = {
    backgroundColor: state.charts.bgColor,
    title: {
      text: '部件质检',
      textStyle: { fontSize: '15', color: state.charts.color },
    },
    tooltip: { trigger: 'axis' },
    legend: {
      data: [
        {
          name: "合格率",
          itemStyle: {
            color: "#6898F7",
          }
        },
        {
          name: "预警线",
          lineStyle: {
            color: "#FF645E",
            width: 1,
          },
        }
      ],
      right: 0
    },
    grid: { top: 70, right: 20, bottom: 20, left: 50 },
    dataZoom: [
        {
          show: false,
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: false,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
    xAxis: [
      {
        type: 'category',
        data: ['12/1', '12/2', '12/3', '12/4', '12/5', '12/6'],
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        name: '合格率',
        nameTextStyle: { padding: [0, 50, 5, 6], color: "#C0C4CC", fontSize: "14px" },
        axisLine: { show: true },
        axisTick: { show: false },
        axisLabel: { color: state.charts.color, formatter: '{value}%' },
        splitLine: {
          lineStyle: {
            color: '#F0F7FF',
          }
        }
      },
    ],
    series: [
      {
        name: '合格率',
        type: 'bar',
        barWidth: 30,
        markLine: {
          data: [
            {
              name: '预警线',
              silent: false,             //鼠标悬停事件  true没有，false有
              lineStyle: {               //警戒线的样式  ，虚实  颜色
                color: "#FF645E",
                type: "solid",
                cap: "square",
              },
              yAxis: state.global.markLineValue           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
            }
          ]
        },
        tooltip: {
          valueFormatter: (value: any) => `${value}%`,
        },
        label: { //柱体上显示数值
          show: true,//开启显示
          position: 'top',//在上方显示
          textStyle: {//数值样式
              fontSize: '14px',
              color: '#505355'
          },
          formatter: '{c}%',
        },
        itemStyle: {
          color: (params: any) => params.value  < state.global.markLineValue ? "#FF645E" : "#6898F7",
        },
        data: [
          { value: 11, stationName: 's1' },
          { value: 34, stationName: 's2' },
          { value: 54, stationName: 's3' },
          { value: 39, stationName: 's4' },
          { value: 63, stationName: 's5' },
          { value: 24, stationName: 's6' },
        ],
      },
      {
        /* TIP: 增加的series */
        type: "line",
        symbol: "none",
        name: "预警线",
        color: "transparent",
      },
    ],
  }
  state.global.homeCharThree.setOption(option)
  state.global.homeCharThree.on('click', function(params: any) {
    console.log(params, 'params', params.data)
  });
}
// 页面加载时
onMounted(() => {
  initBarChart()
})
</script>

<template>
  <div class="echart-container layout-pd">
    <el-row class="echart-card" :gutter="8">
      <el-col class="echart-media" :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <div class="echart-card-item">
          <div ref="barRef" style="height: 100%" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
$echartNavLength: 8;

.echart-container {
  overflow: hidden;

  .echart-card {
    .echart-card-item {
      width: 100%;
      height: 130px;
      border-radius: 4px;
      transition: all ease 0.3s;
      padding: 8px;
      overflow: hidden;
      background: var(--el-color-white);
      color: var(--el-text-color-primary);
      border: 1px solid var(--next-border-color-light);

      &:hover {
        box-shadow: 0 2px 12px var(--next-color-dark-hover);
        transition: all ease 0.3s;
      }

      &-icon {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        flex-shrink: 1;

        i {
          color: var(--el-text-color-placeholder);
        }
      }

      &-title {
        font-size: 15px;
        font-weight: bold;
        height: 30px;
      }
    }
  }

  .echart-card {
    .echart-card-item {
      height: 400px;
      width: 100%;
      overflow: hidden;

      .home-monitor {
        height: 100%;

        .flex-warp-item {
          width: 25%;
          height: 111px;
          display: flex;

          .flex-warp-item-box {
            margin: auto;
            text-align: center;
            color: var(--el-text-color-primary);
            display: flex;
            border-radius: 5px;
            background: var(--next-bg-color);
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              background: var(--el-color-primary-light-9);
              transition: all 0.3s ease;
            }
          }

          @for $i from 0 through $echartNavLength {
            .echart-animation#{$i} {
              opacity: 0;
              animation-name: error-num;
              animation-duration: 0.5s;
              animation-fill-mode: forwards;
              animation-delay: calc($i/10) + s;
            }
          }
        }
      }
    }
  }
}
</style>
