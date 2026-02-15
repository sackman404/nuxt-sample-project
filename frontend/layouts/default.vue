<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout__main {
  flex: 1;
  padding: 24px;
  background-color: #f3f4f6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
