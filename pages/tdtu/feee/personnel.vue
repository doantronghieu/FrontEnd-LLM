<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-white">Personnel</h1>
    
    <div v-if="pending" class="loading-indicator">
      <UProgress animation="carousel" />
      <span class="ml-2">Loading...</span>
    </div>

    <div class="mb-6 flex flex-wrap items-center gap-4">
      <UInput v-model="searchQuery" placeholder="Search personnel..." class="w-full sm:w-64 focus:ring-2 focus:ring-primary">
        <template #left>
          <UIcon name="i-heroicons-magnifying-glass" class="text-gray-400" />
        </template>
        <template #right>
          <UButton v-if="searchQuery" icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="searchQuery = ''" />
        </template>
      </UInput>
      <USelect v-model="filterDepartment" :options="departmentOptions" placeholder="Filter by department" class="w-full sm:w-64" />
    </div>
    
    <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCardPersonnel
        v-for="personnel in filteredPersonnel"
        :key="personnel.email"
        v-bind="personnel"
        class="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
      />
    </TransitionGroup>
  
    <p v-if="filteredPersonnel.length === 0" class="text-center text-gray-200 mt-8 text-lg">
      No personnel found matching your criteria.
    </p>

    <UButton v-if="filteredPersonnel.length < personnelList.length" @click="resetFilters" class="mt-6 mx-auto block">
      Reset Filters
    </UButton>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePersonnelStore } from '~/store/personnelStore';
import { storeToRefs } from 'pinia';
import BaseCardPersonnel from '~/components/TDTU/BaseCardPersonnel.vue';

definePageMeta({
  fetchKey: 'personnel'
});

const personnelStore = usePersonnelStore();
const { personnelList } = storeToRefs(personnelStore);
const { pending } = await useLazyFetch(() => personnelStore.fetchPersonnelData());

const searchQuery = ref('');
const filterDepartment = ref('');

const departmentOptions = computed(() => {
  const departments = new Set(personnelList.value.map(p => p.department));
  return Array.from(departments).map(dept => ({ label: dept, value: dept }));
});

const filteredPersonnel = computed(() => {
  return personnelList.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          p.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDepartment = !filterDepartment.value || p.department === filterDepartment.value;
    return matchesSearch && matchesDepartment;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  filterDepartment.value = '';
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

.u-input, .u-select {
  transition: box-shadow 0.3s ease;
}

.u-input:focus-within, .u-select:focus-within {
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.3);
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.grid {
  transition: all 0.5s ease;
}

.u-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@keyframes filterChange {
  0% { transform: translateY(-5px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.grid > * {
  animation: filterChange 0.3s ease-out;
}
</style>