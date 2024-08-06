<template>
  <UCard>
    <div class="base-card-program-detail rounded-lg shadow-lg">
      <button @click="$emit('close')" class="close-button focus:outline-none focus:ring focus:border-blue-300">
        <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
      </button>
      <h2 class="text-2xl font-bold mb-4">{{ studyField }}</h2>
      <div v-html="renderedContent"></div>
    </div>
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
<span class="text-cyan-600 font-bold">Faculty:</span> ${props.faculty} 
<br>
<span class="text-cyan-600 font-bold">Program Type:</span> ${props.programType}
<br>
<span class="text-cyan-600 font-bold">Education Level:</span> ${props.educationLevel}
<br>
<span class="text-cyan-600 font-bold">Introduction:</span>
${props.introduction}
<br>
<br>

<span class="text-cyan-600 font-bold">Career Prospects:</span>
${props.careerProspects}
<br>
<br>

<span class="text-cyan-600 font-bold">Outcome:</span>
${props.outcome}
<br>
<span class="text-cyan-600 font-bold">Syllabub:</span>
${props.syllabub}
<br>
<span class="text-cyan-600 font-bold">Admission Candidates:</span>
${props.admissionCandidates}
<br>
<span class="text-cyan-600 font-bold">Registration:</span>
${props.registration}
<br>
<span class="text-cyan-600 font-bold">Tuition:</span>
${props.tuition}
<br>
<span class="text-cyan-600 font-bold">Contact:</span>
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
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #f3f4f6;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #e5e7eb;
}
</style>