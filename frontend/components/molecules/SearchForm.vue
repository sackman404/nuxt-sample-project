<script setup lang="ts">
import { computed } from 'vue'
import type { MailLogSearchParams } from '~/types'

interface Props {
  modelValue: MailLogSearchParams
  loading?: boolean
}

interface ValidationErrors {
  start_date?: string
  end_date?: string
  email?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: MailLogSearchParams]
  search: []
  reset: []
}>()

const MAX_SEARCH_DAYS = 90

const errors = computed<ValidationErrors>(() => {
  const result: ValidationErrors = {}
  const { start_date, end_date, email } = props.modelValue

  // 日付の前後チェック
  if (start_date && end_date) {
    const startDateObj = new Date(start_date)
    const endDateObj = new Date(end_date)

    if (startDateObj > endDateObj) {
      result.start_date = '開始日は終了日より前の日付を指定してください'
    }

    // 検索期間の制限チェック
    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > MAX_SEARCH_DAYS) {
      result.end_date = `検索期間は${MAX_SEARCH_DAYS}日以内で指定してください`
    }
  }

  // 片方の日付のみ入力されている場合の警告
  if (start_date && !end_date) {
    result.end_date = '終了日を指定してください'
  } else if (!start_date && end_date) {
    result.start_date = '開始日を指定してください'
  }

  // メールアドレス形式チェック
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      result.email = '有効なメールアドレス形式で入力してください'
    }
  }

  return result
})

const hasErrors = computed(() => Object.keys(errors.value).length > 0)

const updateField = (field: keyof MailLogSearchParams, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value || undefined
  })
}

const handleSearch = () => {
  if (!hasErrors.value) {
    emit('search')
  }
}
</script>

<template>
  <form class="search-form" @submit.prevent="handleSearch">
    <div class="search-form__fields">
      <AppInput
        :model-value="modelValue.start_date || ''"
        type="date"
        label="開始日"
        :error="errors.start_date"
        @update:model-value="updateField('start_date', $event)"
      />
      <AppInput
        :model-value="modelValue.end_date || ''"
        type="date"
        label="終了日"
        :error="errors.end_date"
        @update:model-value="updateField('end_date', $event)"
      />
      <AppInput
        :model-value="modelValue.email || ''"
        type="email"
        label="メールアドレス"
        placeholder="検索するメールアドレス"
        :error="errors.email"
        @update:model-value="updateField('email', $event)"
      />
    </div>
    <div class="search-form__actions">
      <AppButton type="submit" variant="primary" :disabled="loading || hasErrors">
        検索
      </AppButton>
      <AppButton type="button" variant="outline" :disabled="loading" @click="$emit('reset')">
        リセット
      </AppButton>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.search-form__fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.search-form__actions {
  display: flex;
  gap: 8px;
}
</style>
