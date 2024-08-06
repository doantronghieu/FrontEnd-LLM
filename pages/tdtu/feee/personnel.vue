<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Personnel</h1>
    
    <!-- Search and filter controls -->
    <div class="mb-6 flex flex-wrap items-center gap-4">
      <UInput v-model="searchQuery" placeholder="Search personnel..." class="w-full sm:w-64" />
      <USelect v-model="filterDepartment" :options="departmentOptions" placeholder="Filter by department" class="w-full sm:w-64" />
    </div>
    
    <!-- Personnel grid -->
    <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCardPersonnel
        v-for="personnel in filteredPersonnel"
        :key="personnel.email"
        v-bind="personnel"
        class="transition-all duration-300 ease-in-out hover:shadow-lg"
      />
    </TransitionGroup>
    
    <!-- No results message -->
    <p v-if="filteredPersonnel.length === 0" class="text-center text-gray-600 mt-8">
      No personnel found matching your criteria.
    </p>
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

await useFetch(() => personnelStore.fetchPersonnelData());

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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>