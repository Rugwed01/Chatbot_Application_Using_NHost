import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const value = { activeChatId, setActiveChatId };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};