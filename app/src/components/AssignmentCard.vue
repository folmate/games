<script setup>
defineProps({
  assignment: { type: Object, required: true },
  index: { type: Number, required: true },
})

defineEmits(['toggle-done'])
</script>

<template>
  <div
    class="card"
    :class="{ done: assignment.done }"
    :style="{ animationDelay: `${index * 30}ms` }"
  >
    <div class="card-head">
      <span class="card-name">{{ assignment.name }}</span>
      <input
        type="checkbox"
        class="card-check"
        :checked="assignment.done"
        :aria-label="`Mark ${assignment.name} as done`"
        @change="$emit('toggle-done')"
      />
    </div>
    <hr class="card-hr" />
    <div class="card-field">
      <div class="card-field-top">
        <i class="ti ti-arrow-right" aria-hidden="true"></i>
        <span class="card-field-label">next</span>
      </div>
      <span class="card-field-value">{{ assignment.next }}</span>
    </div>
    <div class="card-field">
      <div class="card-field-top">
        <i class="ti ti-map-pin" aria-hidden="true"></i>
        <span class="card-field-label">place</span>
      </div>
      <span class="card-field-value">{{ assignment.place }}</span>
    </div>
    <div class="card-field">
      <div class="card-field-top">
        <i class="ti ti-tool" aria-hidden="true"></i>
        <span class="card-field-label">tool</span>
      </div>
      <span class="card-field-value">{{ assignment.tool }}</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes card-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  background: var(--bg);
  border: 0.5px solid var(--border-emphasis);
  border-radius: var(--radius-lg);
  padding: 14px;
  animation: card-in 200ms ease both;
  transition: opacity 150ms ease, filter 150ms ease;
}

.card.done {
  opacity: 0.38;
  filter: grayscale(1);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-check {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--text-primary);
  flex-shrink: 0;
}

.card-hr {
  border: none;
  border-top: 1px solid var(--border);
  margin-bottom: 10px;
}

.card-field {
  margin-bottom: 8px;
}

.card-field:last-child {
  margin-bottom: 0;
}

.card-field-top {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.card-field-label {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.card-field-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  padding-left: 20px;
  margin-top: 2px;
}
</style>
