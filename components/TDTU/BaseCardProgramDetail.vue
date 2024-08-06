<template>
  <UCard class="base-card-program-detail rounded-lg shadow-lg">
    <button @click="$emit('close')" class="close-button focus:outline-none focus:ring focus:border-blue-300" aria-label="Close">
      <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
    </button>
    <h2 class="text-2xl font-bold mb-6 text-primary">{{ studyField }}</h2>
    <div v-html="renderedContent" class="program-content"></div>
  </UCard>
</template>

<script setup>
import { marked } from 'marked';
import { computed } from 'vue';

marked.use({ breaks: true, gfm: true })

const props = defineProps({
  faculty: { type: String, required: true },
  studyField: { type: String, required: true },
  link: { type: String, required: true },
  programType: { type: String, required: true },
  educationLevel: { type: String, required: true },
  introduction: { type: String, required: true },
  careerProspects: { type: String, required: true },
  outcome: { type: String, required: true },
  syllabub: { type: String, required: true },
  admissionCandidates: { type: String, required: true },
  registration: { type: String, required: true },
  tuition: { type: String, required: true },
  contact: { type: String, required: true },
});

defineEmits(['close']);

const renderedContent = computed(() => {
  const content = `
<p><span class="text-secondary font-bold">Faculty:</span> ${props.faculty}</p>
<p><span class="text-secondary font-bold">Program Type:</span> ${props.programType}</p>
<p><span class="text-secondary font-bold">Education Level:</span> ${props.educationLevel}</p>

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Introduction</h3>
${props.introduction}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Career Prospects</h3>
${props.careerProspects}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Outcome</h3>
${props.outcome}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Syllabub</h3>
${props.syllabub}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Admission Candidates</h3>
${props.admissionCandidates}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Registration</h3>
${props.registration}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Tuition</h3>
${props.tuition}

<h3 class="text-lg font-bold mt-4 mb-2 text-primary">Contact</h3>
${props.contact}
  `;
  return marked.parse(content);
});
</script>

<style scoped>
.base-card-program-detail {
  overflow-y: auto;
  max-height: 85vh;
  margin: 1rem;
  position: relative;
  padding: 2rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.program-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.program-content :deep(p) {
  margin-bottom: 0.75rem;
}

.program-content :deep(ul), .program-content :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.program-content :deep(li) {
  margin-bottom: 0.5rem;
}

.base-card-program-detail {
  scroll-behavior: smooth;
}

.program-content :deep(p) {
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
}

@keyframes detailCardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.base-card-program-detail {
  animation: detailCardEntrance 0.5s ease-out;
}

@media (max-width: 640px) {
  .base-card-program-detail {
    font-size: 14px;
    padding: 1rem;
  }
}

/* Improve scrollbar appearance */
.base-card-program-detail::-webkit-scrollbar {
  width: 8px;
}

.base-card-program-detail::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.base-card-program-detail::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}

.base-card-program-detail::-webkit-scrollbar-thumb:hover {
  background: var(--color-secondary);
}

/* Add a subtle hover effect on links */
.program-content :deep(a) {
  color: var(--color-primary);
  transition: color 0.3s ease;
}

.program-content :deep(a:hover) {
  color: var(--color-secondary);
  text-decoration: underline;
}

/* Improve accessibility */
.base-card-program-detail:focus-within {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>