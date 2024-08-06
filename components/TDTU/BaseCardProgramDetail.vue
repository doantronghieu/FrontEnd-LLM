<template>
  <UCard>
    <div class="base-card-program-detail rounded-lg shadow-lg">
      <button @click="$emit('close')" class="close-button focus:outline-none focus:ring focus:border-blue-300">
        Close
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
**Faculty:** ${props.faculty}

**Program Type:** ${props.programType}

**Education Level:** ${props.educationLevel}

**Introduction:** 
${props.introduction}

**Career Prospects:** 
${props.careerProspects}

**Outcome:** ${props.outcome}

**Syllabub:** ${props.syllabub}

**Admission Candidates:** ${props.admissionCandidates}

**Registration:** ${props.registration}

**Tuition:** ${props.tuition}

**Contact:** ${props.contact}
  `;
  return marked.parse(content);
});
</script>

<style scoped>
.base-card-program-detail {
  overflow-y: auto;
  height: 85vh;
  margin: 1rem;
  position: relative;
  

}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>