// aside
declare interface AsideState {
  menuList: RouteRecordRaw[]
  clientWidth: number
}

// columnsAside
declare interface ColumnsAsideState<T = any> {
  columnsAsideList: T[]
  liIndex: number
  liOldIndex: null | number
  liHoverIndex: null | number
  liOldPath: null | string
  difference: number
  routeSplit: string[]
}

// navBars breadcrumb
declare interface BreadcrumbState<T = any> {
  breadcrumbList: T[]
  routeSplit: string[]
  routeSplitFirst: string
  routeSplitIndex: number
}

// navBars search
declare interface SearchState<T = any> {
  isShowSearch: boolean
  menuQuery: string
  tagsViewList: T[]
}

// navBars tagsView
declare interface TagsViewState<T = any> {
  routeActive: string | T
  routePath: string | unknown
  dropdown: {
    x: string | number
    y: string | number
  }
  sortable: T
  tagsRefsIndex: number
  tagsViewList: T[]
  tagsViewRoutesList: T[]
}

// navBars parent
declare interface ParentViewState<T = any> {
  refreshRouterViewKey: string
  iframeRefreshKey: string
  keepAliveNameList: string[]
  iframeList: T[]
}

// navBars link
declare interface LinkViewState {
  title: string
  isLink: string
}
