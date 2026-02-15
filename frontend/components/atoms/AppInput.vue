<script setup lang="ts">
interface Props {
  modelValue: string
  type?: 'text' | 'email' | 'date'
  placeholder?: string
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  label: '',
  disabled: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="app-input">
    <label v-if="label" class="app-input__label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="app-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.app-input__field {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.app-input__field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.app-input__field:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}
</style>
