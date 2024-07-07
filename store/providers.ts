import { defineStore } from 'pinia';

export const useProvidersStore = defineStore('providers', {
  state: () => ({
    currentProvider: 'random' as 'random' | 'chatgpt' | 'custom',
  }),
  actions: {
    setProvider(provider: 'random' | 'chatgpt' | 'custom') {
      this.currentProvider = provider;
    },
  },
});
