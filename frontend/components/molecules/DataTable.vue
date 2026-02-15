<script setup lang="ts">
import type { MailLog } from '~/types'

interface Props {
  logs: MailLog[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})

const columns = [
  { key: 'sent_at', label: '送信日時', width: '200px' },
  { key: 'sender', label: '送信者' },
  { key: 'title', label: '宛先' }
]

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo'
  })
}
</script>

<template>
  <div class="data-table">
    <AppTable :columns="columns" :data="logs" :loading="loading">
      <template #cell-sent_at="{ value }">
        {{ formatDate(value as string) }}
      </template>
    </AppTable>
  </div>
</template>

<style scoped>
.data-table {
  height: 100%;
}
</style>
