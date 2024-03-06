<script setup lang="ts" name="loginMobile">
import { reactive } from 'vue'

// 定义变量内容
const state = reactive({
  ruleForm: {
    userName: '',
    code: '',
  },
})
</script>

<template>
  <el-form class="login-content-form" size="large">
    <el-form-item class="login-animation1">
      <el-input v-model="state.ruleForm.userName" autocomplete="off" clearable placeholder="请输入手机号" text>
        <template #prefix>
          <i class="iconfont icon-dianhua el-input__icon" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2">
      <el-col :span="15">
        <el-input v-model="state.ruleForm.code" autocomplete="off" clearable maxlength="4" placeholder="请输入验证码" text>
          <template #prefix>
            <el-icon class="el-input__icon">
              <ele-Position />
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1" />
      <el-col :span="8">
        <el-button v-waves class="login-content-code">
          获取验证码
        </el-button>
      </el-col>
    </el-form-item>
    <el-form-item class="login-animation3">
      <el-button v-waves class="login-content-submit" round type="primary">
        <span>登 录</span>
      </el-button>
    </el-form-item>
    <div class="login-animation4 login-msg mt-30px text-12px">
      * 温馨提示：建议使用谷歌、Microsoft Edge，版本 79.0.1072.62 及以上浏览器，360浏览器请使用极速模式
    </div>
  </el-form>
</template>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;

	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}

	.login-content-code {
		width: 100%;
		padding: 0;
	}

	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}

	.login-msg {
		color: var(--el-text-color-placeholder);
	}
}
</style>
