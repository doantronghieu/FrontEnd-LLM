import { defineStore } from 'pinia';

export const useProvidersStore = defineStore('providers', {
  state: () => ({
    currentProvider: 'random' as 'random' | 'chatgpt',
  }),
  actions: {
    setProvider(provider: 'random' | 'chatgpt') {
      this.currentProvider = provider;
    },
  },
});
