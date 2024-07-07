import { ref } from 'vue';

export function useChatCustom() {
  const config = useRuntimeConfig()
  const axios = require("@nuxtjs/axios")

  const streamChatCustom = async function*(
    query,
    serverFastapi = config.SERVER_FASTAPI,
    historyType = config.HISTORY_TYPE,
    userId = null,
    sessionId = 'default',
  ) {
    const url = `${serverFastapi}/stream-agent`;
    const params = {
      query,
      history_type: historyType,
      user_id: userId,
      session_id: sessionId,
    };
  
    try {
      const response = await axios({
        url,
        params,
        method: 'GET',
        responseType: 'stream',
      });
  
      const decoder = new TextDecoder();
      response.data.on('data', (chunk) => {
        const decodedChunk = decoder.decode(chunk);
        yield decodedChunk;
      });
  
      await new Promise((resolve, reject) => {
        response.data.on('end', resolve);
        response.data.on('error', reject);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return {
    streamAgentAsync: streamChatCustom
  }
}