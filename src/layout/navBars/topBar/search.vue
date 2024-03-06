<script setup lang="ts" name="layoutBreadcrumbSearch">
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes'

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes)
const layoutMenuAutocompleteRef = ref()
const router = useRouter()
const state = reactive<SearchState>({
  isShowSearch: false,
  menuQuery: '',
  tagsViewList: [],
})

// 搜索弹窗打开
function openSearch() {
  state.menuQuery = ''
  state.isShowSearch = true
  initTageView()
  nextTick(() => {
    setTimeout(() => {
      layoutMenuAutocompleteRef.value.focus()
    })
  })
}
// 搜索弹窗关闭
function closeSearch() {
  state.isShowSearch = false
}
// 菜单搜索数据过滤
function menuSearch(queryString: string, cb: Function) {
  const results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList
  cb(results)
}
// 菜单搜索过滤
function createFilter(queryString: string) {
  return (restaurant: RouteItem) => {
    return (
      restaurant.path.toLowerCase().includes(queryString.toLowerCase())
      || restaurant.meta!.title!.toLowerCase().includes(queryString.toLowerCase())
      || restaurant.meta!.title!.includes(queryString.toLowerCase())
    )
  }
}
// 初始化菜单数据
function initTageView() {
  if (state.tagsViewList.length > 0)
    return false
  tagsViewRoutes.value.map((v: RouteItem) => {
    if (!v.meta?.isHide)
      state.tagsViewList.push({ ...v })
  })
}
// 当前菜单选中时
function onHandleSelect(item: RouteItem) {
  const { path, redirect } = item
  if (item.meta?.isLink && !item.meta?.isIframe)
    window.open(item.meta?.isLink)
  else if (redirect)
    router.push(redirect)
  else router.push(path)
  closeSearch()
}

// 暴露变量
defineExpose({
  openSearch,
})
</script>

<template>
  <div class="layout-search-dialog">
    <el-dialog v-model="state.isShowSearch" destroy-on-close :show-close="false">
      <template #footer>
        <el-autocomplete ref="layoutMenuAutocompleteRef" v-model="state.menuQuery" :fetch-suggestions="menuSearch"
          :fit-input-width="true" placeholder="菜单搜索：支持中文、路由路径" @select="onHandleSelect">
          <template #prefix>
            <el-icon class="el-input__icon">
              <ele-Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div>
              <SvgIcon class="mr-5px" :name="item.meta.icon" />
              {{ item.meta.title }}
            </div>
          </template>
        </el-autocomplete>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.layout-search-dialog {
  position: relative;

  :deep(.el-dialog) {

    padding: 0!important;
    .el-dialog__header,
    .el-dialog__body {
      display: none;
    }

    .el-dialog__footer {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -53vh;
    }
  }

  :deep(.el-autocomplete) {
    width: 560px;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
