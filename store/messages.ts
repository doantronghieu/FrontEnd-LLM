import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as { sender: string, content: string }[],
  }),
  actions: {
    addMessage(sender: string, content: string) {
      this.messages.push({ sender, content })
    },
  },
})
