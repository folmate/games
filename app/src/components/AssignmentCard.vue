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
        v-if="assignment.done"
        class="ti ti-check card-check-icon"
        aria-hidden="true"
      ></i>
    </div>
    <hr class="card-hr" />
    <div class="card-field">
      <i class="ti ti-arrow-right card-icon" aria-hidden="true"></i>
      <span class="card-field-label">next</span>
      <span class="card-field-value">{{ assignment.next }}</span>
    </div>
    <div class="card-field">
      <i class="ti ti-map-pin card-icon" aria-hidden="true"></i>
      <span class="card-field-label">place</span>
      <span class="card-field-value">{{ assignment.place }}</span>
    </div>
    <div class="card-field">
      <i class="ti ti-tool card-icon" aria-hidden="true"></i>
      <span class="card-field-label">tool</span>
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
  border: 1px solid #cccccc;
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
  border-color: #86efac;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  min-height: 22px;
}

.card-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-check-icon {
  font-size: 1rem;
  color: #16a34a;
}

.card-hr {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 10px;
}

.card-field {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 6px;
}

.card-field:last-child {
  margin-bottom: 0;
}

.card-icon {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.card-field-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.card-field-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media print {
  .card {
    border-color: #aaaaaa;
    animation: none;
  }

  .card.done {
    border-color: #16a34a;
  }
}
</style>
