<script setup lang="ts" name="systemDicDialog">
import { reactive, ref } from 'vue'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 定义变量内容
const dicDialogFormRef = ref()
const state = reactive({
  ruleForm: {
    dicName: '', // 字典名称
    fieldName: '', // 字段名
    status: true, // 字典状态
    list: [] as ListType[], // 子集字段 + 属性值
    describe: '', // 字典描述
  },
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
})

// 打开弹窗
function openDialog(type: string, row: RowDicType) {
  if (type === 'edit') {
    if (row.fieldName === 'SYS_UERINFO') {
      row.list = [
        { id: Math.random(), label: 'sex', value: '1' },
        { id: Math.random(), label: 'sex', value: '0' },
      ]
    }
    else {
      row.list = [
        { id: Math.random(), label: 'role', value: 'admin' },
        { id: Math.random(), label: 'role', value: 'common' },
        { id: Math.random(), label: 'roleName', value: '超级管理员' },
        { id: Math.random(), label: 'roleName', value: '普通用户' },
      ]
    }
    state.ruleForm = row
    state.dialog.title = '修改字典'
    state.dialog.submitTxt = '修 改'
  }
  else {
    state.dialog.title = '新增字典'
    state.dialog.submitTxt = '新 增'
    // 清空表单，此项需加表单验证才能使用
    // nextTick(() => {
    // 	dicDialogFormRef.value.resetFields();
    // });
  }
  state.dialog.isShowDialog = true
}
// 关闭弹窗
function closeDialog() {
  state.dialog.isShowDialog = false
}
// 取消
function onCancel() {
  closeDialog()
}
// 提交
function onSubmit() {
  closeDialog()
  emit('refresh')
  // if (state.dialog.type === 'add') { }
}
// 新增行
function onAddRow() {
  state.ruleForm.list.push({
    id: Math.random(),
    label: '',
    value: '',
  })
}
// 删除行
function onDelRow(k: number) {
  state.ruleForm.list.splice(k, 1)
}

// 暴露变量
defineExpose({
  openDialog,
})
</script>

<template>
  <div class="system-dic-dialog-container">
    <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title" width="769px">
      <el-alert class="mb-20px" :closable="false" title="半成品，交互过于复杂，请自行扩展！" type="warning" />
      <el-form ref="dicDialogFormRef" label-width="90px" :model="state.ruleForm" size="default">
        <el-row :gutter="35">
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="字典名称">
              <el-input v-model="state.ruleForm.dicName" clearable placeholder="请输入字典名称" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="字段名">
              <el-input v-model="state.ruleForm.fieldName" clearable placeholder="请输入字段名，拼接 ruleForm.list" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
            <el-form-item label="字典状态">
              <el-switch v-model="state.ruleForm.status" active-text="启" inactive-text="禁" inline-prompt />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
            <el-row v-for="(v, k) in state.ruleForm.list" :key="k" :gutter="35">
              <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
                <el-form-item :prop="`list[${k}].label`">
                  <template #label>
                    <el-button v-if="k === 0" circle size="small" type="primary" @click="onAddRow">
                      <el-icon>
                        <ele-Plus />
                      </el-icon>
                    </el-button>
                    <el-button v-else circle size="small" type="danger" @click="onDelRow(k)">
                      <el-icon>
                        <ele-Delete />
                      </el-icon>
                    </el-button>
                    <span class="ml-10px">字段</span>
                  </template>
                  <el-input v-model="v.label" placeholder="请输入字段名" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
                <el-form-item label="属性" :prop="`list[${k}].value`">
                  <el-input v-model="v.value" placeholder="请输入属性值" style="width: 100%" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="mb-20px" :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
            <el-form-item label="字典描述">
              <el-input
                v-model="state.ruleForm.describe" maxlength="150" placeholder="请输入字典描述"
                type="textarea"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="default" @click="onCancel">取 消</el-button>
          <el-button size="default" type="primary" @click="onSubmit">{{ state.dialog.submitTxt }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
