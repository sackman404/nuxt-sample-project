<script setup lang="ts">
interface Column {
  key: string
  label: string
  width?: string
}

interface Props {
  columns: Column[]
  data: Record<string, unknown>[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false
})
</script>

<template>
  <div class="app-table-wrapper">
    <table class="app-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="app-table__loading">
            読み込み中...
          </td>
        </tr>
        <tr v-else-if="data.length === 0">
          <td :colspan="columns.length" class="app-table__empty">
            データがありません
          </td>
        </tr>
        <tr v-else v-for="(row, index) in data" :key="index">
          <td v-for="column in columns" :key="column.key">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.app-table-wrapper {
  overflow-x: auto;
}

.app-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.app-table th,
.app-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.app-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.app-table tbody tr:hover {
  background-color: #f9fafb;
}

.app-table__loading,
.app-table__empty {
  text-align: center;
  color: #6b7280;
  padding: 32px 16px;
}
</style>
