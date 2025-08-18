import React from 'react';
import Sidebar from './Sidebar';
import MessageView from './MessageView'; // We will create this
import MessageInput from './MessageInput'; // We will create this
import { useChat } from '../../hooks/useChat';

const ChatInterface: React.FC = () => {
  const { activeChatId } = useChat();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {activeChatId ? (
          <>
            <MessageView />
            <MessageInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a chat or create a new one to start.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;