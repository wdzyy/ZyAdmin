<script setup lang="ts" name="layoutParentView">
import { computed, defineAsyncComponent, nextTick, onBeforeMount, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useKeepALiveNames } from '@/stores/keepAliveNames'
import { useThemeConfig } from '@/stores/themeConfig'
import { Session } from '@/utils/storage'
import mittBus from '@/utils/mitt'

// 引入组件
const Iframes = defineAsyncComponent(() => import('@/layout/routerView/iframes.vue'))

// 定义变量内容
const route = useRoute()
const router = useRouter()
const storesKeepAliveNames = useKeepALiveNames()
const storesThemeConfig = useThemeConfig()
const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames)
const { themeConfig } = storeToRefs(storesThemeConfig)
const state = reactive<ParentViewState>({
  refreshRouterViewKey: '', // 非 iframe tagsview 右键菜单刷新时
  iframeRefreshKey: '', // iframe tagsview 右键菜单刷新时
  keepAliveNameList: [],
  iframeList: [],
})

// 设置主界面切换动画
const setTransitionName = computed(() => {
  return themeConfig.value.animation
})
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
  return themeConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList
})
// 设置 iframe 显示/隐藏
const isIframePage = computed(() => {
  return route.meta.isIframe
})
// 获取 iframe 组件列表(未进行渲染)
async function getIframeListRoutes() {
  router.getRoutes().forEach((v) => {
    if (v.meta.isIframe) {
      v.meta.isIframeOpen = false
      v.meta.loading = true
      state.iframeList.push({ ...v })
    }
  })
}
// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
  state.keepAliveNameList = keepAliveNames.value
  mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
    state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name)
    state.refreshRouterViewKey = ''
    state.iframeRefreshKey = ''
    nextTick(() => {
      state.refreshRouterViewKey = fullPath
      state.iframeRefreshKey = fullPath
      state.keepAliveNameList = keepAliveNames.value
    })
  })
})
// 页面加载时
onMounted(() => {
  getIframeListRoutes()
  nextTick(() => {
    setTimeout(() => {
      if (themeConfig.value.isCacheTagsView) {
        const tagsViewArr: RouteItem[] = Session.get('tagsViewList') || []
        cachedViews.value = tagsViewArr.filter(item => item.meta?.isKeepAlive).map(item => item.name as string)
      }
    }, 0)
  })
})
// 页面卸载时
onUnmounted(() => {
  mittBus.off('onTagsViewRefreshRouterView', () => { })
})
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
watch(
  () => route.fullPath,
  () => {
    state.refreshRouterViewKey = decodeURI(route.fullPath)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="layout-parent">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" :name="setTransitionName">
        <keep-alive :include="getKeepAliveNames">
          <component :is="Component" v-show="!isIframePage" :key="state.refreshRouterViewKey" class="w100" />
        </keep-alive>
      </transition>
    </router-view>
    <transition mode="out-in" :name="setTransitionName">
      <Iframes v-show="isIframePage" class="w100" :list="state.iframeList" :name="setTransitionName"
        :refresh-key="state.iframeRefreshKey" />
    </transition>
  </div>
</template>
