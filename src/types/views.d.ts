/**
 * views personal
 */
interface NewInfo {
  title: string
  date: string
  link: string
}
interface Recommend {
  title: string
  msg: string
  icon: string
  bg: string
  iconColor: string
}
declare interface PersonalState {
  newsInfoList: NewInfo[]
  recommendList: Recommend[]
  personalForm: {
    name: string
    email: string
    autograph: string
    occupation: string
    phone: string
    sex: string
  }
}

/**
 * views visualizing
 */
declare interface Demo2State<T = any> {
  time: {
    txt: string
    fun: number
  }
  dropdownList: T[]
  dropdownActive: string
  skyList: T[]
  dBtnList: T[]
  chartData4Index: number
  dBtnActive: number
  earth3DBtnList: T[]
  chartData4List: T[]
  myCharts: T[]
}

/**
 * views params
 */
declare interface ParamsState {
  value: string
  tagsViewName: string
  tagsViewNameIsI18n: boolean
}

/**
 * views system
 */
// role
declare interface RowRoleType {
  roleName: string
  roleSign: string
  describe: string
  sort: number
  status: boolean
  createTime: string
}

interface SysRoleTableType extends TableType {
  data: RowRoleType[]
}

declare interface SysRoleState {
  tableData: SysRoleTableType
}

declare interface TreeType {
  id: number
  label: string
  children?: TreeType[]
}

// user
declare interface RowUserType<T = any> {
  userName: string
  userNickname: string
  roleSign: string
  department: string[]
  phone: string
  email: string
  sex: string
  password: string
  overdueTime: T
  status: boolean
  describe: string
  createTime: T
}

interface SysUserTableType extends TableType {
  data: RowUserType[]
}

declare interface SysUserState {
  tableData: SysUserTableType
}

declare interface DeptTreeType {
  deptName: string
  createTime: string
  status: boolean
  sort: number
  describe: string
  id: number | string
  children?: DeptTreeType[]
}

// dept
declare interface RowDeptType extends DeptTreeType {
  deptLevel: string[]
  person: string
  phone: string
  email: string
}

interface SysDeptTableType extends TableType {
  data: DeptTreeType[]
}

declare interface SysDeptState {
  tableData: SysDeptTableType
}

// dic
interface ListType {
  id: number
  label: string
  value: string
}

declare interface RowDicType {
  dicName: string
  fieldName: string
  describe: string
  status: boolean
  createTime: string
  list: ListType[]
}

interface SysDicTableType extends TableType {
  data: RowDicType[]
}

declare interface SysDicState {
  tableData: SysDicTableType
}

/**
 * views pages
 */
//  filtering
declare interface FilteringChilType {
  id: number | string
  label: string
  active: boolean
}

declare interface FilterListType {
  img: string
  title: string
  evaluate: string
  collection: string
  price: string
  monSales: string
  id: number | string
  loading?: boolean
}

declare interface FilteringRowType {
  title: string
  isMore: boolean
  isShowMore: boolean
  id: number | string
  children: FilteringChilType[]
}

// tableRules
declare interface TableRulesHeaderType {
  prop: string
  width: string | number
  label: string
  isRequired?: boolean
  isTooltip?: boolean
  type: string
}

declare interface TableRulesState {
  tableData: {
    data: EmptyObjectType[]
    header: TableRulesHeaderType[]
    option: SelectOptionType[]
  }
}

declare interface TableRulesOneProps {
  name: string
  email: string
  autograph: string
  occupation: string
}

// tree
declare interface RowTreeType {
  id: number
  label: string
  label1: string
  label2: string
  isShow: boolean
  children?: RowTreeType[]
}

// workflow index
declare interface NodeListState {
  id: string | number
  nodeId: string | undefined
  class: HTMLElement | string
  left: number | string
  top: number | string
  icon: string
  name: string
}

declare interface LineListState {
  sourceId: string
  targetId: string
  label: string
}

declare interface XyState {
  x: string | number
  y: string | number
}

declare interface WorkflowState<T = any> {
  leftNavList: T[]
  dropdownNode: XyState
  dropdownLine: XyState
  isShow: boolean
  jsPlumb: T
  jsPlumbNodeIndex: null | number
  jsplumbDefaults: T
  jsplumbMakeSource: T
  jsplumbMakeTarget: T
  jsplumbConnect: T
  jsplumbData: {
    nodeList: NodeListState[]
    lineList: LineListState[]
  }
}

// workflow drawer
declare interface WorkflowDrawerNodeState<T = any> {
  node: { [key: string]: T }
  nodeRules: T
  form: T
  tabsActive: string
  loading: {
    extend: boolean
  }
}

declare interface WorkflowDrawerLabelType {
  type: string
  label: string
}

declare interface WorkflowDrawerState<T = any> {
  isOpen: boolean
  nodeData: {
    type: string
  }
  jsplumbConn: T
}

/**
 * views make
 */
// tableDemo
declare interface TableDemoPageType {
  pageNum: number
  pageSize: number
}

declare interface TableHeaderType {
  key: string
  width: string
  title: string
  type: string | number
  colWidth: string
  width?: string | number
  height?: string | number
  isCheck: boolean
}

declare interface TableSearchType {
  label: string
  prop: string
  placeholder: string
  required: boolean
  type: string
  options?: SelectOptionType[]
}

declare interface TableDemoState {
  tableData: {
    data: EmptyObjectType[]
    header: TableHeaderType[]
    config: {
      total: number
      loading: boolean
      isBorder: boolean
      isSelection: boolean
      isSerialNo: boolean
      isOperate: boolean
    }
    search: TableSearchType[]
    param: EmptyObjectType
    printName: string
  }
}
