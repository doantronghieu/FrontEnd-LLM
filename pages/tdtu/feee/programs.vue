<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Programs</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCardProgramIntro
        v-for="program in programList"
        :key="program.link"
        :faculty="program.faculty"
        :studyField="program.studyField"
        :link="program.link"
        :programType="program.programType"
        :educationLevel="program.educationLevel"
        @click="openModal(program)"
      />
    </div>
    <UModal v-model="isModalOpen" fullscreen>
      <div v-if="selectedProgram" class="modal-content">
        <BaseCardProgramDetail
          :faculty="selectedProgram.faculty"
          :studyField="selectedProgram.studyField"
          :link="selectedProgram.link"
          :programType="selectedProgram.programType"
          :educationLevel="selectedProgram.educationLevel"
          :introduction="selectedProgram.introduction"
          :careerProspects="selectedProgram.careerProspects"
          :outcome="selectedProgram.outcome"
          :syllabub="selectedProgram.syllabub"
          :admissionCandidates="selectedProgram.admissionCandidates"
          :registration="selectedProgram.registration"
          :tuition="selectedProgram.tuition"
          :contact="selectedProgram.contact"
          @close="closeModal"
        />
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { useProgramStore } from '~/store/programStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import BaseCardProgramIntro from '~/components/TDTU/BaseCardProgramIntro.vue';
import BaseCardProgramDetail from '~/components/TDTU/BaseCardProgramDetail.vue';

definePageMeta({
  fetchKey: 'programs'
});

const programStore = useProgramStore();
const { programList } = storeToRefs(programStore);
const selectedProgram = ref(null);
const isModalOpen = ref(false);

await useFetch(() => programStore.fetchProgramData());


const openModal = (program) => {
  selectedProgram.value = program;
  isModalOpen.value = true;
  // console.log('Selected program:', selectedProgram.value); // Debug log
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProgram.value = null;
};

</script>

<style scoped>
.modal-content {
  width: 100%;
  margin: 0 auto;
}
</style>