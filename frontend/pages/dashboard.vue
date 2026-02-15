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
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard__title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
}
</style>
