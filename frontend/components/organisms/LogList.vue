<script setup lang="ts">
import { useLogStore } from '~/stores/logStore'
import type { MailLogSearchParams } from '~/types'

const logStore = useLogStore()
const api = useApi()

const searchParams = ref<MailLogSearchParams>({})

const fetchLogs = async () => {
  logStore.setLoading(true)
  logStore.setError(null)

  try {
    const response = await api.fetchLogs(searchParams.value)
    logStore.setLogs(response.data, response.total)
    logStore.setSearchParams(searchParams.value)
  } catch (error) {
    logStore.setError(error instanceof Error ? error.message : 'エラーが発生しました')
  } finally {
    logStore.setLoading(false)
  }
}

const handleReset = () => {
  searchParams.value = {}
  fetchLogs()
}

const handleExport = async () => {
  try {
    await api.exportCsv(searchParams.value)
  } catch (error) {
    console.error('CSV export error:', error)
  }
}

onMounted(() => {
  fetchLogs()
})
</script>

<template>
  <div class="log-list">
    <div class="log-list__fixed">
      <LogSearchPanel
        :search-params="searchParams"
        :loading="logStore.isLoading"
        :total-count="logStore.total"
        @update:search-params="searchParams = $event"
        @search="fetchLogs"
        @reset="handleReset"
        @export="handleExport"
      />

      <div v-if="logStore.error" class="log-list__error">
        {{ logStore.error }}
      </div>
    </div>

    <div class="log-list__scrollable">
      <DataTable
        :logs="logStore.logs"
        :loading="logStore.isLoading"
      />
    </div>
  </div>
</template>

<style scoped>
.log-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow: hidden;
}

.log-list__fixed {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.log-list__scrollable {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.log-list__error {
  padding: 12px 16px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  color: #dc2626;
  font-size: 14px;
}
</style>
