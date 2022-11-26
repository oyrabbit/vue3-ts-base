<template>
  <div class="test" @click="tabS(2)">测试</div>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="default">默认按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button>
</template>

<script setup lang="ts">
import useHomeStore from '@/stores/modules/home/home'
const homeStore = useHomeStore()

const tabS = (id: number): void => {
  console.log(id)
}
</script>

<style lang="scss" scoped>
.test {
  width: 100px;
}
</style>
