export function useChatRandom() {
  const randomMessages = [
    "Hello! How can I assist you today?",
    "Is there anything specific you need help with?",
    "I'm here to help! What's on your mind?",
    "Feel free to ask me anything!",
    "How's your day going so far?",
  ];

  const getRandomMessage = () => {
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
  };

  return {
    randomMessages,
    getRandomMessage,
  }
}