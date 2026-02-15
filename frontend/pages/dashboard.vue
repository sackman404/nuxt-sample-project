<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="dashboard">
    <h2 class="dashboard__title">メール送信ログ</h2>
    <LogList />
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard__title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  flex-shrink: 0;
}
</style>
