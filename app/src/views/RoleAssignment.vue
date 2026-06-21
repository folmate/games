<script setup>
import { ref, computed } from 'vue'
import TagInput from '../components/TagInput.vue'
import AssignmentCard from '../components/AssignmentCard.vue'

const names = ref([])
const places = ref([])
const tools = ref([])
const assignments = ref([])
const generation = ref(0)

const validation = computed(() => {
  const n = names.value.length
  if (n === 0) return { type: null, message: null, canGenerate: false }

  const missingPlaces = Math.max(0, n - places.value.length)
  const missingTools = Math.max(0, n - tools.value.length)

  if (missingPlaces > 0 || missingTools > 0) {
    const parts = []
    if (missingPlaces > 0) parts.push(`${missingPlaces} more place(s)`)
    if (missingTools > 0) parts.push(`${missingTools} more tool(s)`)
    return {
      type: 'error',
      message: `Need ${parts.join(' and/or ')} to cover all ${n} names.`,
      canGenerate: false,
    }
  }

  const extraPlaces = places.value.length - n
  const extraTools = tools.value.length - n

  if (extraPlaces > 0 || extraTools > 0) {
    const parts = []
    if (extraPlaces > 0) parts.push(`${extraPlaces} unused place(s)`)
    if (extraTools > 0) parts.push(`${extraTools} unused tool(s)`)
    return {
      type: 'warning',
      message: `You have ${parts.join(' and/or ')} — they won't all be assigned.`,
      canGenerate: true,
    }
  }

  return { type: null, message: null, canGenerate: true }
})

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function derange(arr) {
  if (arr.length <= 1) return [...arr]
  let result
  do {
    result = shuffle(arr)
  } while (result.some((v, i) => v === arr[i]))
  return result
}

function generate() {
  const n = names.value.length
  const assignedPlaces = shuffle(places.value).slice(0, n)
  const assignedTools = shuffle(tools.value).slice(0, n)
  const nextNames = derange(names.value)
  generation.value++
  assignments.value = names.value.map((name, i) => ({
    name,
    next: nextNames[i],
    place: assignedPlaces[i],
    tool: assignedTools[i],
    done: false,
  }))
}

function toggleDone(index) {
  assignments.value[index].done = !assignments.value[index].done
}
</script>

<template>
  <main class="page">
    <h2 class="sr-only">
      Assign roles — generate a random loop-free chain where each person gets a next person, a place, and a tool.
    </h2>

    <div class="page-header">
      <h1 class="page-title">Role assignment</h1>
      <p class="page-subtitle">Generate a random loop-free role assignment chain.</p>
    </div>

    <div class="input-grid">
      <TagInput v-model="names" label="Names" :allow-duplicates="false" />
      <TagInput v-model="places" label="Places" :allow-duplicates="true" />
      <TagInput v-model="tools" label="Tools" :allow-duplicates="true" />
    </div>

    <div
      v-if="validation.message"
      class="validation-msg"
      :class="validation.type"
      role="status"
    >
      <i
        class="ti"
        :class="validation.type === 'error' ? 'ti-alert-circle' : 'ti-alert-triangle'"
        aria-hidden="true"
      ></i>
      {{ validation.message }}
    </div>

    <div class="actions">
      <button
        type="button"
        class="generate-btn"
        :disabled="!validation.canGenerate"
        :aria-disabled="!validation.canGenerate"
        @click="generate"
      >
        <i class="ti ti-refresh" aria-hidden="true"></i>
        Generate
      </button>
    </div>

    <template v-if="assignments.length > 0">
      <div class="results-header">
        <span class="results-label">Assignment chain</span>
        <span class="count-pill">{{ assignments.length }} assignments</span>
      </div>
      <div class="results-grid">
        <AssignmentCard
          v-for="(assignment, i) in assignments"
          :key="`${generation}-${i}`"
          :assignment="assignment"
          :index="i"
          @toggle-done="toggleDone(i)"
        />
      </div>
    </template>
  </main>
</template>

<style scoped>
.page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.validation-msg {
  margin-top: 1rem;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
}

.validation-msg.error {
  background: var(--bg-danger);
  color: var(--text-danger);
  border-color: var(--border-danger);
}

.validation-msg.warning {
  background: var(--bg-warning);
  color: var(--text-warning);
  border-color: var(--border-warning);
}

.actions {
  margin-top: 1.5rem;
}

.generate-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--text-primary);
  color: var(--bg);
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: 0.9375rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
}

.generate-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.generate-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.results-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
}

.count-pill {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 4px 12px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

@media (max-width: 600px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
}
</style>
