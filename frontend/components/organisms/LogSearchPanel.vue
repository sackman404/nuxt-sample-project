<script setup lang="ts">
import type { MailLogSearchParams } from '~/types'

interface Props {
  searchParams: MailLogSearchParams
  loading?: boolean
  totalCount?: number
}

withDefaults(defineProps<Props>(), {
  loading: false,
  totalCount: 0
})

const emit = defineEmits<{
  'update:searchParams': [value: MailLogSearchParams]
  search: []
  reset: []
  export: []
}>()
</script>

<template>
  <div class="log-search-panel">
    <SearchForm
      :model-value="searchParams"
      :loading="loading"
      @update:model-value="$emit('update:searchParams', $event)"
      @search="$emit('search')"
      @reset="$emit('reset')"
    />
    <div class="log-search-panel__info">
      <span class="log-search-panel__count">
        検索結果: {{ totalCount }}件
      </span>
      <AppButton
        variant="secondary"
        :disabled="loading || totalCount === 0"
        @click="$emit('export')"
      >
        CSV出力
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.log-search-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.log-search-panel__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-search-panel__count {
  font-size: 14px;
  color: #6b7280;
}
</style>
