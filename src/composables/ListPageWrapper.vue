<template>
  <div class="list-page layout-padding">
    <div class="layout-padding-auto auto-height" shadow="hover">
    <div class="list-page__head" v-if="slots.head">
      <slot name="head">
      </slot>
    </div>
      <div class="list-page__main" v-if="slots.default">
        <slot></slot>
      </div>
      <div class="list-page__foot" v-if="slots.foot">
        <slot name="foot"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = defineSlots()

</script>

<style scoped lang="scss">
	// 列表页高度自适应
	.list-page {

    .el-card__body,
    .auto-height {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;

      // el-table会自动撑开高度。其他元素撑开高度需要设置flex: 1;
      .el-table {
        flex: 1;
      }
    }

    .auto-height {
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      background-color: #fff;
      padding: 16px;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
    }

    .list-page__head {
      padding-bottom: 16px;
    }

    .list-page__main {
      flex: 1;
      overflow: auto;
    }

    .list-page__foot {
      padding-top: 16px;
      margin-left: auto;
    }
  }
</style>
