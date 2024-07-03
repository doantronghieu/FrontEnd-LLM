import { ref } from 'vue';

export function useChatGpt() {
  const modeChatGpt = ref(false);

  const setModeChatGpt = (value) => {
    modeChatGpt.value = value;
  };

  return {
    modeChatGpt,
    setModeChatGpt,
  };
}
