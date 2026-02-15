<script setup lang="ts">
import type { MailLogSearchParams } from '~/types'

interface Props {
  modelValue: MailLogSearchParams
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: MailLogSearchParams]
  search: []
  reset: []
}>()

const updateField = (field: keyof MailLogSearchParams, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value || undefined
  })
}
</script>

<template>
  <form class="search-form" @submit.prevent="$emit('search')">
    <div class="search-form__fields">
      <AppInput
        :model-value="modelValue.start_date || ''"
        type="date"
        label="開始日"
        @update:model-value="updateField('start_date', $event)"
      />
      <AppInput
        :model-value="modelValue.end_date || ''"
        type="date"
        label="終了日"
        @update:model-value="updateField('end_date', $event)"
      />
      <AppInput
        :model-value="modelValue.email || ''"
        type="text"
        label="メールアドレス"
        placeholder="検索するメールアドレス"
        @update:model-value="updateField('email', $event)"
      />
    </div>
    <div class="search-form__actions">
      <AppButton type="submit" variant="primary" :disabled="loading">
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
