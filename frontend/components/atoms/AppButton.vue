<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['app-button', `app-button--${variant}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app-button--primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.app-button--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.app-button--secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.app-button--secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.app-button--outline {
  background-color: transparent;
  color: #3b82f6;
  border-color: #3b82f6;
}

.app-button--outline:hover:not(:disabled) {
  background-color: #eff6ff;
}
</style>
