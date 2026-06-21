<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Array, required: true },
  label: { type: String, required: true },
  allowDuplicates: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const inputValue = ref('')

function focusInput() {
  inputRef.value?.focus()
}

function addItem(value) {
  const trimmed = value.trim()
  if (!trimmed) return
  if (!props.allowDuplicates && props.modelValue.includes(trimmed)) return
  emit('update:modelValue', [...props.modelValue, trimmed])
}

function removeItem(index) {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}

function sortItems() {
  const sorted = [...props.modelValue].sort((a, b) => a.localeCompare(b))
  emit('update:modelValue', sorted)
}

function commitInput() {
  addItem(inputValue.value)
  inputValue.value = ''
}

function handleKeydown(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    commitInput()
  } else if (e.key === 'Tab' && inputValue.value.trim()) {
    e.preventDefault()
    commitInput()
  } else if (e.key === 'Backspace' && inputValue.value === '') {
    removeItem(props.modelValue.length - 1)
  }
}

function handleBlur() {
  if (inputValue.value.trim()) {
    commitInput()
  }
}

function handlePaste(e) {
  const text = e.clipboardData.getData('text')
  if (text.includes('\n') || text.includes(',')) {
    e.preventDefault()
    text.split(/[\n,]/).map(s => s.trim()).filter(Boolean).forEach(part => addItem(part))
    inputValue.value = ''
  }
}
</script>

<template>
  <div class="col">
    <div class="col-header">
      <span class="col-label">{{ label }}</span>
      <button
        type="button"
        class="sort-btn"
        :aria-label="`Sort ${label} alphabetically`"
        @click="sortItems"
      >
        <i class="ti ti-arrows-sort" aria-hidden="true"></i>
      </button>
    </div>
    <div class="tag-area" @click="focusInput">
      <span v-for="(item, i) in modelValue" :key="i" class="tag">
        {{ item }}
        <button
          type="button"
          class="tag-x"
          :aria-label="`Remove ${item}`"
          @click.stop="removeItem(i)"
        >×</button>
      </span>
      <input
        ref="inputRef"
        v-model="inputValue"
        class="tag-text"
        @keydown="handleKeydown"
        @blur="handleBlur"
        @paste="handlePaste"
      />
    </div>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.col-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.col-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--text-tertiary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1;
}

.sort-btn:hover {
  color: var(--text-secondary);
  background: var(--bg-secondary);
}

.tag-area {
  min-height: 80px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  cursor: text;
  background: var(--bg);
  align-content: flex-start;
}

.tag-area:focus-within {
  border-color: var(--border-emphasis);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 2px 6px 2px 10px;
  font-size: 0.8125rem;
  color: var(--text-primary);
  white-space: nowrap;
}

.tag-x {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  color: var(--text-tertiary);
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
}

.tag-x:hover {
  color: var(--text-primary);
}

.tag-text {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  font-family: inherit;
  flex: 1;
  min-width: 80px;
  color: var(--text-primary);
}
</style>
