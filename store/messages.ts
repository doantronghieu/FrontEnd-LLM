import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as { sender: string, content: string }[],
  }),
  actions: {
    addMessage(sender: string, content: string) {
      this.messages.push({ sender, content })
    },
    addChunk(sender: string, chunk: string) {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage && lastMessage.sender === sender) {
        lastMessage.content += chunk;
      } else {
        this.messages.push({ sender, content: chunk });
      }
    },
  },
})
