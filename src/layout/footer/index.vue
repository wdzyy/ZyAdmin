<script setup lang="ts" name="layoutFooter">
// 此处需有内容（注释也得），否则缓存将失败
</script>

<template>
  <div class="layout-footer pb-15px">
    <div class="layout-footer-warp">
      <div class="h-full w-full flex items-center justify-center">
        <span>&copy;2023-2033 泽瑜Zy</span> &nbsp; <a
          href="https://beian.miit.gov.cn"
          target="_blank"
        >浙ICP备2024063533号-1</a>
        <a
          class="mx-1 flex items-center justify-center" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011302000565"
          target="_blank"
        >
          <img
            alt="备案" class="h-4 w-4"
            src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png"
          ><span>浙公网安备：33011302000565号</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;

	&-warp {
		margin: auto;
		color: var(--el-text-color-secondary);
		text-align: center;
		animation: error-num 0.3s ease;
	}
}
</style>
