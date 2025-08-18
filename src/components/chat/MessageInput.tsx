import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INSERT_USER_MESSAGE, SEND_MESSAGE_TO_BOT } from '../../graphql/mutations';
import { useChat } from '../../hooks/useChat';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { activeChatId } = useChat();

  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [sendMessageToBot, { loading: botReplying }] = useMutation(SEND_MESSAGE_TO_BOT);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !activeChatId) return;

    const content = message;
    setMessage(''); // Clear input immediately for better UX

    try {
      // Step 1: Save the user's message to the database
      await insertUserMessage({
        variables: {
          chat_id: activeChatId,
          content: content,
        },
      });

      // Step 2: Call the n8n action to get the bot's response
      await sendMessageToBot({
        variables: {
          chat_id: activeChatId,
          message: content,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: handle the error, maybe restore the typed message
      setMessage(content);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="p-4 bg-slate-800 border-t border-slate-700">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={botReplying ? "Bot is thinking..." : "Type your message..."}
          disabled={botReplying}
          className="w-full px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
        />
      </form>
    </div>
  );
};

export default MessageInput;