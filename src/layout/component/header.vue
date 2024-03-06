<script setup lang="ts" name="layoutHeader">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes'

// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('@/layout/navBars/index.vue'))

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)
</script>

<template>
  <el-header v-show="!isTagsViewCurrenFull" class="layout-header">
    <NavBarsIndex />
  </el-header>
</template>
