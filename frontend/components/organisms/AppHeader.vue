<script setup lang="ts">
</script>

<template>
  <header class="app-header">
    <div class="app-header__logo">
      <h1>メール送信時間監視システム</h1>
    </div>
    <div class="app-header__user">
      <span class="app-header__user-name">ゲストユーザー</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #1f2937;
  color: white;
}

.app-header__logo h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.app-header__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-header__user-name {
  font-size: 14px;
}
</style>
