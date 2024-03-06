// https://www.npmjs.com/package/mitt
import type { Emitter } from 'mitt'
import mitt from 'mitt'

// 类型
const emitter: Emitter<MittType> = mitt<MittType>()

// 导出
export default emitter
