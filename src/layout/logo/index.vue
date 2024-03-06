<script setup lang="ts" name="layoutLogo">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import logoMini from '@/assets/logo-mini.svg'

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 设置 logo 的显示。classic 经典布局默认显示 logo
const setShowLogo = computed(() => {
	const { isCollapse, layout } = themeConfig.value
	return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000
})
// logo 点击实现菜单展开/收起
function onThemeConfigChange() {
	if (themeConfig.value.layout === 'transverse')
		return false
	themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}
</script>

<template>
	<div v-if="setShowLogo" class="layout-logo" @click="onThemeConfigChange">
		<img class="layout-logo-medium-img" :src="logoMini">
		<span>{{ themeConfig.globalTitle }}</span>
	</div>
	<div v-else class="layout-logo-size" @click="onThemeConfigChange">
		<img class="layout-logo-size-img" :src="logoMini">
	</div>
</template>

<style scoped lang="scss">
.layout-logo {
	width: 220px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
	color: var(--el-color-primary);
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;

	span {
		white-space: nowrap;
		display: inline-block;
	}

	&:hover {
		span {
			color: var(--color-primary-light-2);
		}
	}

	&-medium-img {
		width: 20px;
		margin-right: 5px;
	}
}

.layout-logo-size {
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;

	&-img {
		width: 20px;
		margin: auto;
	}

	&:hover {
		img {
			animation: logoAnimation 0.3s ease-in-out;
		}
	}
}
</style>
