<script setup lang="ts" name="systemUserDialog">
import { reactive, ref } from 'vue'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

// 定义变量内容
const userDialogFormRef = ref()
const state = reactive({
  ruleForm: {
    userName: '', // 账户名称
    userNickname: '', // 用户昵称
    roleSign: '', // 关联角色
    department: [] as string[], // 部门
    phone: '', // 手机号
    email: '', // 邮箱
    sex: '', // 性别
    password: '', // 账户密码
    overdueTime: '', // 账户过期
    status: true, // 用户状态
    describe: '', // 用户描述
  },
  deptData: [] as DeptTreeType[], // 部门数据
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
})

// 打开弹窗
function openDialog(type: string, row: RowUserType) {
  if (type === 'edit') {
    state.ruleForm = row
    state.dialog.title = '修改用户'
    state.dialog.submitTxt = '修 改'
  }
  else {
    state.dialog.title = '新增用户'
    state.dialog.submitTxt = '新 增'
    // 清空表单，此项需加表单验证才能使用
    // nextTick(() => {
    // 	userDialogFormRef.value.resetFields();
    // });
  }
  state.dialog.isShowDialog = true
  getMenuData()
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
// 初始化部门数据
function getMenuData() {
  state.deptData.push({
    deptName: 'ZyAdmin',
    createTime: new Date().toLocaleString(),
    status: true,
    sort: Math.random(),
    describe: '顶级部门',
    id: Math.random(),
    children: [
      {
        deptName: 'IT外包服务',
        createTime: new Date().toLocaleString(),
        status: true,
        sort: Math.random(),
        describe: '总部',
        id: Math.random(),
      },
      {
        deptName: '资本控股',
        createTime: new Date().toLocaleString(),
        status: true,
        sort: Math.random(),
        describe: '分部',
        id: Math.random(),
      },
    ],
  })
}

// 暴露变量
defineExpose({
  openDialog,
})
</script>

<template>
  <div class="system-user-dialog-container">
    <el-dialog v-model="state.dialog.isShowDialog" :title="state.dialog.title" width="769px">
      <el-form ref="userDialogFormRef" label-width="90px" :model="state.ruleForm" size="default">
        <el-row :gutter="35">
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="账户名称">
              <el-input v-model="state.ruleForm.userName" clearable placeholder="请输入账户名称" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="用户昵称">
              <el-input v-model="state.ruleForm.userNickname" clearable placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="关联角色">
              <el-select v-model="state.ruleForm.roleSign" class="w100" clearable placeholder="请选择">
                <el-option label="超级管理员" value="admin" />
                <el-option label="普通用户" value="common" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="部门">
              <el-cascader
                v-model="state.ruleForm.department"
                class="w100" clearable :options="state.deptData"
                placeholder="请选择部门" :props="{ checkStrictly: true, value: 'deptName', label: 'deptName' }"
              >
                <template #default="{ node, data }">
                  <span>{{ data.deptName }}</span>
                  <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="手机号">
              <el-input v-model="state.ruleForm.phone" clearable placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="邮箱">
              <el-input v-model="state.ruleForm.email" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="性别">
              <el-select v-model="state.ruleForm.sex" class="w100" clearable placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="账户密码">
              <el-input v-model="state.ruleForm.password" clearable placeholder="请输入" type="password" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="账户过期">
              <el-date-picker v-model="state.ruleForm.overdueTime" class="w100" placeholder="请选择" type="date" />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
            <el-form-item label="用户状态">
              <el-switch v-model="state.ruleForm.status" active-text="启" inactive-text="禁" inline-prompt />
            </el-form-item>
          </el-col>
          <el-col class="mb-20px" :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
            <el-form-item label="用户描述">
              <el-input
                v-model="state.ruleForm.describe" maxlength="150" placeholder="请输入用户描述"
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
