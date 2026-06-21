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
    role="button"
    tabindex="0"
    :aria-pressed="assignment.done"
    :aria-label="`${assignment.name} — click to mark as written down`"
    @click="$emit('toggle-done')"
    @keydown.enter.prevent="$emit('toggle-done')"
    @keydown.space.prevent="$emit('toggle-done')"
  >
    <div class="card-head">
      <span class="card-name">{{ assignment.name }}</span>
      <i
        class="ti card-status-icon"
        :class="assignment.done ? 'ti-check' : 'ti-square'"
        aria-hidden="true"
      ></i>
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
  border: 1px solid var(--border-emphasis);
  border-radius: var(--radius-lg);
  padding: 14px;
  cursor: pointer;
  user-select: none;
  animation: card-in 200ms ease both;
  transition: background 150ms ease, border-color 150ms ease;
}

.card:hover:not(.done) {
  background: var(--bg-secondary);
}

.card.done {
  background: #f0faf2;
  border-color: rgba(22, 163, 74, 0.35);
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

.card-status-icon {
  font-size: 1rem;
  color: var(--text-tertiary);
  flex-shrink: 0;
  transition: color 150ms ease;
}

.card.done .card-status-icon {
  color: #16a34a;
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
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.card-field-label {
  font-size: 0.6875rem;
  font-weight: 600;
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
