import { ref } from 'vue';
import OpenAI from 'openai';

export function useChatGpt() {
  const config = useRuntimeConfig()
  
  const openai = new OpenAI({
    apiKey: config.public.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })
  const model = ref('gpt-3.5-turbo')

  const streamChatGpt = async (msg, updateMessage) => {
    const stream = await openai.chat.completions.create({
      messages: [{ role: 'user', content: msg }],
      stream: true,
      model: model.value,
    });
  
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      updateMessage(content);
    }
  };

  return {
    openai,
    streamChatGpt,
  };
}
