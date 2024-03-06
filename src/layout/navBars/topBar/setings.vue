<script setup lang="ts" name="layoutBreadcrumbSeting">
import { computed, nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import { useChangeColor } from '@/utils/theme'
import { verifyAndSpace } from '@/utils/toolsValidate'
import { Local } from '@/utils/storage'
import Watermark from '@/utils/watermark'
import commonFunction from '@/utils/commonFunction'
import other from '@/utils/other'
import mittBus from '@/utils/mitt'

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const { copyText } = commonFunction()
const { getLightColor, getDarkColor } = useChangeColor()
const state = reactive({
  isMobile: false,
})

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value
})
// 1、全局主题
function onColorPickerChange() {
  if (!getThemeConfig.value.primary)
    return ElMessage.warning('全局主题 primary 颜色值不能为空')
  // 颜色加深
  document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getThemeConfig.value.primary, 0.1)}`)
  document.documentElement.style.setProperty('--el-color-primary', getThemeConfig.value.primary)
  // 颜色变浅
  for (let i = 1; i <= 9; i++)
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getThemeConfig.value.primary, i / 10)}`)

  setDispatchThemeConfig()
}
// 2、菜单 / 顶栏
function onBgColorPickerChange(bg: string) {
  document.documentElement.style.setProperty(`--next-bg-${bg}`, themeConfig.value[bg])
  if (bg === 'menuBar')
    document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, getLightColor(getThemeConfig.value.menuBar, 0.05))

  onTopBarGradualChange()
  onMenuBarGradualChange()
  onColumnsMenuBarGradualChange()
  setDispatchThemeConfig()
}
// 2、菜单 / 顶栏 --> 顶栏背景渐变
function onTopBarGradualChange() {
  setGraduaFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar)
}
// 2、菜单 / 顶栏 --> 菜单背景渐变
function onMenuBarGradualChange() {
  setGraduaFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar)
}
// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
function onColumnsMenuBarGradualChange() {
  setGraduaFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar)
}
// 2、菜单 / 顶栏 --> 背景渐变函数
function setGraduaFun(el: string, bool: boolean, color: string) {
  nextTick(() => {
    setTimeout(() => {
      const els = document.querySelector(el)
      if (!els)
        return false
      document.documentElement.style.setProperty('--el-menu-bg-color', document.documentElement.style.getPropertyValue('--next-bg-menuBar'))
      if (bool)
        els.setAttribute('style', `background:linear-gradient(to bottom , ${color}, ${getLightColor(color, 0.5)})`)
      else els.setAttribute('style', ``)
      setLocalThemeConfig()
    }, 300)
  })
}
// 2、分栏设置 ->
function onColumnsMenuHoverPreloadChange() {
  setLocalThemeConfig()
}
// 3、界面设置 --> 菜单水平折叠
function onThemeConfigChange() {
  setDispatchThemeConfig()
}
// 3、界面设置 --> 固定 Header
function onIsFixedHeaderChange() {
  getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader
  setLocalThemeConfig()
}
// 3、界面设置 --> 经典布局分割菜单
function onClassicSplitMenuChange() {
  getThemeConfig.value.isBreadcrumb = false
  setLocalThemeConfig()
  mittBus.emit('getBreadcrumbIndexSetFilterRoutes')
}
// 4、界面显示 --> 侧边栏 Logo
function onIsShowLogoChange() {
  getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo
  setLocalThemeConfig()
}
// 4、界面显示 --> 面包屑 Breadcrumb
function onIsBreadcrumbChange() {
  if (getThemeConfig.value.layout === 'classic')
    getThemeConfig.value.isClassicSplitMenu = false

  setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 拖拽
function onSortableTagsViewChange() {
  mittBus.emit('openOrCloseSortable')
  setLocalThemeConfig()
}
// 4、界面显示 --> 开启 TagsView 共用
function onShareTagsViewChange() {
  mittBus.emit('openShareTagsView')
  setLocalThemeConfig()
}
// 4、界面显示 --> 灰色模式/色弱模式
function onAddFilterChange(attr: string) {
  if (attr === 'grayscale') {
    if (getThemeConfig.value.isGrayscale)
      getThemeConfig.value.isInvert = false
  }
  else {
    if (getThemeConfig.value.isInvert)
      getThemeConfig.value.isGrayscale = false
  }
  const cssAttr
    = attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `invert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`
  const appEle = document.body
  appEle.setAttribute('style', `filter: ${cssAttr}`)
  setLocalThemeConfig()
}
// 4、界面显示 --> 深色模式
function onAddDarkChange() {
  const body = document.documentElement as HTMLElement
  if (getThemeConfig.value.isIsDark)
    body.setAttribute('data-theme', 'dark')
  else body.setAttribute('data-theme', '')
}
// 4、界面显示 --> 开启水印
function onWartermarkChange() {
  getThemeConfig.value.isWartermark ? Watermark.set(getThemeConfig.value.wartermarkText) : Watermark.del()
  setLocalThemeConfig()
}
// 4、界面显示 --> 水印文案
function onWartermarkTextInput(val: string) {
  getThemeConfig.value.wartermarkText = verifyAndSpace(val)
  if (getThemeConfig.value.wartermarkText === '')
    return false
  if (getThemeConfig.value.isWartermark)
    Watermark.set(getThemeConfig.value.wartermarkText)
  setLocalThemeConfig()
}
// 5、布局切换
function onSetLayout(layout: string) {
  Local.set('oldLayout', layout)
  if (getThemeConfig.value.layout === layout)
    return false
  if (layout === 'transverse')
    getThemeConfig.value.isCollapse = false
  getThemeConfig.value.layout = layout
  getThemeConfig.value.isDrawer = false
  initLayoutChangeFun()
}
// 设置布局切换函数
function initLayoutChangeFun() {
  onBgColorPickerChange('menuBar')
  onBgColorPickerChange('menuBarColor')
  onBgColorPickerChange('menuBarActiveColor')
  onBgColorPickerChange('topBar')
  onBgColorPickerChange('topBarColor')
  onBgColorPickerChange('columnsMenuBar')
  onBgColorPickerChange('columnsMenuBarColor')
}
// 关闭弹窗时，初始化变量。变量用于处理 layoutScrollbarRef.value.update() 更新滚动条高度
function onDrawerClose() {
  getThemeConfig.value.isFixedHeaderChange = false
  getThemeConfig.value.isShowLogoChange = false
  getThemeConfig.value.isDrawer = false
  setLocalThemeConfig()
}
// 布局配置弹窗打开
function openDrawer() {
  getThemeConfig.value.isDrawer = true
}
// 触发 store 布局配置更新
function setDispatchThemeConfig() {
  setLocalThemeConfig()
  setLocalThemeConfigStyle()
}
// 存储布局配置
function setLocalThemeConfig() {
  Local.remove('themeConfig')
  Local.set('themeConfig', getThemeConfig.value)
}
// 存储布局配置全局主题样式（html根标签）
function setLocalThemeConfigStyle() {
  Local.set('themeConfigStyle', document.documentElement.style.cssText)
}
// 一键复制配置
function onCopyConfigClick() {
  const copyThemeConfig = Local.get('themeConfig')
  copyThemeConfig.isDrawer = false
  copyText(JSON.stringify(copyThemeConfig)).then(() => {
    getThemeConfig.value.isDrawer = false
  })
}
// 一键恢复默认
function onResetConfigClick() {
  Local.clear()
  window.location.reload()
  // @ts-expect-error
  Local.set('version', __NEXT_VERSION__)
}
// 初始化菜单样式等
function initSetStyle() {
  // 2、菜单 / 顶栏 --> 顶栏背景渐变
  onTopBarGradualChange()
  // 2、菜单 / 顶栏 --> 菜单背景渐变
  onMenuBarGradualChange()
  // 2、菜单 / 顶栏 --> 分栏菜单背景渐变
  onColumnsMenuBarGradualChange()
}
onMounted(() => {
  nextTick(() => {
    // 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
    if (!Local.get('frequency'))
      initLayoutChangeFun()
    Local.set('frequency', 1)
    // 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
    mittBus.on('layoutMobileResize', (res: LayoutMobileResize) => {
      getThemeConfig.value.layout = res.layout
      getThemeConfig.value.isDrawer = false
      initLayoutChangeFun()
      state.isMobile = other.isMobile()
    })
    setTimeout(() => {
      // 默认样式
      onColorPickerChange()
      // 灰色模式
      if (getThemeConfig.value.isGrayscale)
        onAddFilterChange('grayscale')
      // 色弱模式
      if (getThemeConfig.value.isInvert)
        onAddFilterChange('invert')
      // 深色模式
      if (getThemeConfig.value.isIsDark)
        onAddDarkChange()
      // 开启水印
      onWartermarkChange()
      // 初始化菜单样式等
      initSetStyle()
    }, 100)
  })
})
onUnmounted(() => {
  mittBus.off('layoutMobileResize', () => { })
})

// 暴露变量
defineExpose({
  openDrawer,
})
</script>

<template>
  <div class="layout-breadcrumb-seting">
    <el-drawer v-model="getThemeConfig.isDrawer" destroy-on-close direction="rtl" size="260px" title="布局配置"
      @close="onDrawerClose">
      <el-scrollbar class="layout-breadcrumb-seting-bar">
        <!-- 全局主题 -->
        <el-divider content-position="left">
          全局主题
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            primary
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            深色模式
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange" />
          </div>
        </div>

        <!-- 顶栏设置 -->
        <el-divider content-position="left">
          顶栏设置
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            顶栏背景
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBar" size="default" @change="onBgColorPickerChange('topBar')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            顶栏默认字体颜色
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBarColor" size="default"
              @change="onBgColorPickerChange('topBarColor')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-10px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            顶栏背景渐变
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTopBarColorGradual" size="small" @change="onTopBarGradualChange" />
          </div>
        </div>

        <!-- 菜单设置 -->
        <el-divider content-position="left">
          菜单设置
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单背景
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBar" size="default" @change="onBgColorPickerChange('menuBar')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单默认字体颜色
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBarColor" size="default"
              @change="onBgColorPickerChange('menuBarColor')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单高亮背景色
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBarActiveColor" show-alpha size="default"
              @change="onBgColorPickerChange('menuBarActiveColor')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-14px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单背景渐变
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorGradual" size="small" @change="onMenuBarGradualChange" />
          </div>
        </div>

        <!-- 分栏设置 -->
        <el-divider content-position="left" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          分栏设置
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏菜单背景
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.columnsMenuBar" :disabled="getThemeConfig.layout !== 'columns'"
              size="default" @change="onBgColorPickerChange('columnsMenuBar')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏菜单默认字体颜色
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.columnsMenuBarColor" :disabled="getThemeConfig.layout !== 'columns'"
              size="default" @change="onBgColorPickerChange('columnsMenuBarColor')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-14px"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏菜单背景渐变
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isColumnsMenuBarColorGradual" :disabled="getThemeConfig.layout !== 'columns'"
              size="small" @change="onColumnsMenuBarGradualChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-14px"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏菜单鼠标悬停预加载
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isColumnsMenuHoverPreload" :disabled="getThemeConfig.layout !== 'columns'"
              size="small" @change="onColumnsMenuHoverPreloadChange" />
          </div>
        </div>

        <!-- 界面设置 -->
        <el-divider content-position="left">
          界面设置
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex"
          :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单水平折叠
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse" :disabled="getThemeConfig.layout === 'transverse'" size="small"
              @change="onThemeConfigChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px"
          :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            菜单手风琴
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isUniqueOpened" :disabled="getThemeConfig.layout === 'transverse'"
              size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            固定 Header
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFixedHeader" size="small" @change="onIsFixedHeaderChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px"
          :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            经典布局分割菜单
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isClassicSplitMenu" :disabled="getThemeConfig.layout !== 'classic'"
              size="small" @change="onClassicSplitMenuChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启锁屏
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isLockScreen" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-11px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            自动锁屏(s/秒)
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input-number v-model="getThemeConfig.lockScreenTime" controls-position="right" :max="9999" :min="1"
              size="default" style="width: 90px" @change="setLocalThemeConfig" />
          </div>
        </div>

        <!-- 界面显示 -->
        <el-divider content-position="left">
          界面显示
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            侧边栏 Logo
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShowLogo" size="small" @change="onIsShowLogoChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px"
          :style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 Breadcrumb
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isBreadcrumb"
              :disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'" size="small"
              @change="onIsBreadcrumbChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 Breadcrumb 图标
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isBreadcrumbIcon" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 Tagsview
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsview" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 Tagsview 图标
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsviewIcon" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 TagsView 缓存
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCacheTagsView" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px" :style="{ opacity: state.isMobile ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 TagsView 拖拽
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isSortableTagsView" :disabled="state.isMobile ? true : false" size="small"
              @change="onSortableTagsViewChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 TagsView 共用
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShareTagsView" size="small" @change="onShareTagsViewChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启 Footer
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFooter" size="small" @change="setLocalThemeConfig" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            灰色模式
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isGrayscale" size="small" @change="onAddFilterChange('grayscale')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            色弱模式
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isInvert" size="small" @change="onAddFilterChange('invert')" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            开启水印
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isWartermark" size="small" @change="onWartermarkChange" />
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-14px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            水印文案
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input v-model="getThemeConfig.wartermarkText" size="default" style="width: 90px"
              @input="onWartermarkTextInput($event)" />
          </div>
        </div>

        <!-- 其它设置 -->
        <el-divider content-position="left">
          其它设置
        </el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            Tagsview 风格
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="default" style="width: 90px"
              @change="setLocalThemeConfig">
              <el-option label="风格1" value="tags-style-one" />
              <el-option label="风格4" value="tags-style-four" />
              <el-option label="风格5" value="tags-style-five" />
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            主页面切换动画
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.animation" placeholder="请选择" size="default" style="width: 90px"
              @change="setLocalThemeConfig">
              <el-option label="slide-right" value="slide-right" />
              <el-option label="slide-left" value="slide-left" />
              <el-option label="opacitys" value="opacitys" />
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt-15px"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏高亮风格
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.columnsAsideStyle" :disabled="getThemeConfig.layout !== 'columns' ? true : false" placeholder="请选择" size="default"
              style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="圆角" value="columns-round" />
              <el-option label="卡片" value="columns-card" />
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mb-27px mt-15px"
          :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-seting-bar-flex-label">
            分栏布局风格
          </div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.columnsAsideLayout" :disabled="getThemeConfig.layout !== 'columns' ? true : false" placeholder="请选择" size="default"
              style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="水平" value="columns-horizontal" />
              <el-option label="垂直" value="columns-vertical" />
            </el-select>
          </div>
        </div>

        <!-- 布局切换 -->
        <el-divider content-position="left">
          布局切换
        </el-divider>
        <div class="layout-drawer-content-flex">
          <!-- defaults 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
            <section class="el-container el-circular"
              :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
              <aside class="el-aside" style="width: 20px" />
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px" />
                <main class="el-main" />
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">
                  默认
                </p>
              </div>
            </div>
          </div>
          <!-- classic 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('classic')">
            <section class="el-container is-vertical el-circular"
              :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
              <header class="el-header" style="height: 10px" />
              <section class="el-container">
                <aside class="el-aside" style="width: 20px" />
                <section class="el-container is-vertical">
                  <main class="el-main" />
                </section>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">
                  经典
                </p>
              </div>
            </div>
          </div>
          <!-- transverse 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
            <section class="el-container is-vertical el-circular"
              :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
              <header class="el-header" style="height: 10px" />
              <section class="el-container">
                <section class="el-container is-vertical">
                  <main class="el-main" />
                </section>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">
                  横向
                </p>
              </div>
            </div>
          </div>
          <!-- columns 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('columns')">
            <section class="el-container el-circular"
              :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
              <aside class="el-aside-dark" style="width: 10px" />
              <aside class="el-aside" style="width: 20px" />
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px" />
                <main class="el-main" />
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">
                  分栏
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-config">
          <el-alert :closable="false" title="点击下方按钮，复制布局配置去 `src/store/modules/themeConfig.ts` 中修改。" type="warning" />
          <el-button ref="copyConfigBtnRef" class="copy-config-btn" size="default" type="primary"
            @click="onCopyConfigClick">
            <el-icon class="mr-5px">
              <ele-CopyDocument />
            </el-icon>
            一键复制配置
          </el-button>
          <el-button class="copy-config-btn-reset" size="default" type="info" @click="onResetConfigClick">
            <el-icon class="mr-5px">
              <ele-RefreshRight />
            </el-icon>
            一键恢复默认
          </el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
  height: calc(100vh - 50px);
  padding: 0 15px;

  :deep(.el-scrollbar__view) {
    overflow-x: hidden !important;
  }

  .layout-breadcrumb-seting-bar-flex {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    &-label {
      flex: 1;
      color: var(--el-text-color-primary);
    }
  }

  .layout-drawer-content-flex {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;

    .layout-drawer-content-item {
      width: 50%;
      height: 70px;
      cursor: pointer;
      border: 1px solid transparent;
      position: relative;
      padding: 5px;

      .el-container {
        height: 100%;

        .el-aside-dark {
          background-color: var(--next-color-seting-header);
        }

        .el-aside {
          background-color: var(--next-color-seting-aside);
        }

        .el-header {
          background-color: var(--next-color-seting-header);
        }

        .el-main {
          background-color: var(--next-color-seting-main);
        }
      }

      .el-circular {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
      }

      .drawer-layout-active {
        border: 1px solid;
        border-color: var(--el-color-primary);
      }

      .layout-tips-warp,
      .layout-tips-warp-active {
        transition: all 0.3s ease-in-out;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        border-color: var(--el-color-primary-light-5);
        border-radius: 100%;
        padding: 4px;

        .layout-tips-box {
          transition: inherit;
          width: 30px;
          height: 30px;
          z-index: 9;
          border: 1px solid;
          border-color: var(--el-color-primary-light-5);
          border-radius: 100%;

          .layout-tips-txt {
            transition: inherit;
            position: relative;
            top: 5px;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 2px;
            white-space: nowrap;
            color: var(--el-color-primary-light-5);
            text-align: center;
            transform: rotate(30deg);
            left: -1px;
            background-color: var(--next-color-seting-main);
            width: 32px;
            height: 17px;
            line-height: 17px;
          }
        }
      }

      .layout-tips-warp-active {
        border: 1px solid;
        border-color: var(--el-color-primary);

        .layout-tips-box {
          border: 1px solid;
          border-color: var(--el-color-primary);

          .layout-tips-txt {
            color: var(--el-color-primary) !important;
            background-color: var(--next-color-seting-main) !important;
          }
        }
      }

      &:hover {
        .el-circular {
          transition: all 0.3s ease-in-out;
          border: 1px solid;
          border-color: var(--el-color-primary);
        }

        .layout-tips-warp {
          transition: all 0.3s ease-in-out;
          border-color: var(--el-color-primary);

          .layout-tips-box {
            transition: inherit;
            border-color: var(--el-color-primary);

            .layout-tips-txt {
              transition: inherit;
              color: var(--el-color-primary) !important;
              background-color: var(--next-color-seting-main) !important;
            }
          }
        }
      }
    }
  }

  .copy-config {
    margin: 10px 0;

    .copy-config-btn {
      width: 100%;
      margin-top: 15px;
    }

    .copy-config-btn-reset {
      width: 100%;
      margin: 10px 0 0;
    }
  }
}
</style>
