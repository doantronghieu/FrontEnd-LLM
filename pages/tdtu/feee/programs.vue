<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-primary">Programs</h1>

    <div class="mb-8 flex flex-wrap items-center gap-4">
      <UInput v-model="searchQuery" placeholder="Search programs..." class="w-full sm:w-64 focus:ring-2 focus:ring-primary">
        <template #right>
          <UButton v-if="searchQuery" icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="searchQuery = ''" />
        </template>
      </UInput>
      <USelect v-model="filterEducationLevel" :options="educationLevelOptions" placeholder="Education Level" class="w-full sm:w-64" />
      <USelect v-model="filterProgramType" :options="programTypeOptions" placeholder="Program Type" class="w-full sm:w-64" />
    </div>

    <TransitionGroup 
      name="fade" 
      tag="div" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <BaseCardProgramIntro
        v-for="program in filteredPrograms"
        :key="program.link"
        v-bind="program"
        @click="openModal(program)"
        class="transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer hover:scale-105"
      />
    </TransitionGroup>

    <p v-if="filteredPrograms.length === 0" class="text-center text-gray-600 mt-8">
      No programs found matching your criteria.
    </p>

    <UButton v-if="filteredPrograms.length < programList.length" @click="resetFilters" class="mt-6 mx-auto block">
      Reset Filters
    </UButton>

    <UModal v-model="isModalOpen" :ui="{ width: 'max-w-4xl', overlay: { blur: 'sm' } }" @close="closeModal">
      <div v-if="selectedProgram" class="modal-content">
        <BaseCardProgramDetail
          v-bind="selectedProgram"
          @close="closeModal"
        />
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProgramStore } from '~/store/programStore';
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

const { pending } = await useLazyFetch(() => programStore.fetchProgramData());

const searchQuery = ref('');
const filterEducationLevel = ref('');
const filterProgramType = ref('');

const educationLevelOptions = computed(() => {
  const levels = new Set(programList.value.map(p => p.educationLevel));
  return Array.from(levels).map(level => ({ label: level, value: level }));
});

const programTypeOptions = computed(() => {
  const types = new Set(programList.value.map(p => p.programType));
  return Array.from(types).map(type => ({ label: type, value: type }));
});

const filteredPrograms = computed(() => {
  return programList.value.filter(p => {
    const matchesSearch = p.studyField.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesEducationLevel = !filterEducationLevel.value || p.educationLevel === filterEducationLevel.value;
    const matchesProgramType = !filterProgramType.value || p.programType === filterProgramType.value;
    return matchesSearch && matchesEducationLevel && matchesProgramType;
  });
});

const openModal = (program) => {
  selectedProgram.value = program;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedProgram.value = null;
};

const resetFilters = () => {
  searchQuery.value = '';
  filterEducationLevel.value = '';
  filterProgramType.value = '';
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.text-primary {
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.u-input {
  transition: box-shadow 0.3s ease;
}

.u-input:focus-within {
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.3);
}

/* Add a loading indicator */
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loading-indicator::after {
  content: '';
  width: 30px;
  height: 30px;
  border: 2px solid var(--color-primary);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Add a smooth transition for filter changes */
.grid {
  transition: all 0.5s ease;
}
</style>