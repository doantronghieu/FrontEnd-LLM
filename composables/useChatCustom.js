// useChatCustom.js
import { ref } from 'vue';

export function useChatCustom() {
  const config = useRuntimeConfig();
  const userIp = ref(null);

  const getUserIp = async () => {
    if (!userIp.value) {
      try {
        const response = await fetch('/api/get-ip');
        const data = await response.json();
        userIp.value = data.ip;
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    }
    return userIp.value;
  };

  const streamChatCustom = async (
    query,
    updateMessage,
    serverFastapi = config.public.SERVER_FASTAPI,
    historyType = config.public.HISTORY_TYPE,
    userId = null,
    sessionId = 'default'
  ) => {
    const ip = await getUserIp();
    console.log(historyType)
    const url = `${serverFastapi}/stream-agent`;
    const params = new URLSearchParams({
      query,
      history_type: historyType,
      user_id: ip || userId || 'default_user',
      session_id: ip || sessionId,
    });

    try {
      const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        const chunk = decoder.decode(value);
        updateMessage(chunk);
      }
    } catch (error) {
      console.error('Error in streamChatCustom:', error);
      updateMessage('[Error: Unable to fetch response]');
    }
  };

  return {
    streamChatCustom,
    getUserIp,
  };
}