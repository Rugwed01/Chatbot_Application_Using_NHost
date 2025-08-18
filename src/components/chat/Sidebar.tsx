import React from 'react';
import { useSignOut, useUserData } from '@nhost/react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS } from '../../graphql/queries';
import { CREATE_CHAT } from '../../graphql/mutations';
import { useChat } from '../../hooks/useChat'; // Import the useChat hook

type Chat = {
  id: string;
  title: string;
};

const Sidebar: React.FC = () => {
  const user = useUserData();
  const { signOut } = useSignOut();
  const { activeChatId, setActiveChatId } = useChat(); // Get state from context

  const { loading, error, data } = useQuery(GET_CHATS);
  const [createChat] = useMutation(CREATE_CHAT, {
    // This will automatically refresh the chat list after a new one is created
    refetchQueries: [{ query: GET_CHATS }],
  });

  const handleNewChat = async () => {
    const title = prompt('Enter a title for your new chat:');
    if (title) {
      try {
        const result = await createChat({ variables: { title } });
        // Automatically select the new chat
        if (result.data?.insert_chats_one?.id) {
          setActiveChatId(result.data.insert_chats_one.id);
        }
      } catch (e) {
        console.error(e);
        alert('Error creating chat.');
      }
    }
  };

  const renderChatList = () => {
    if (loading) return <p className="p-4 text-slate-400">Loading chats...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
    const chats = data?.chats;
    if (!chats || chats.length === 0) return <p className="p-4 text-slate-400">No chats yet.</p>;

    return (
      <ul className="p-2">
        {chats.map((chat: Chat) => (
          <li
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)} // Make the chat item clickable
            className={`px-4 py-2 rounded cursor-pointer ${
              activeChatId === chat.id ? 'bg-sky-700' : 'hover:bg-slate-700'
            }`}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-slate-800 text-white">
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h1 className="text-lg font-semibold">My Chats</h1>
        <button
          onClick={handleNewChat} // Connect the button
          className="px-3 py-1 text-sm bg-sky-600 rounded hover:bg-sky-700"
        >
          + New
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">{renderChatList()}</div>
      <div className="p-4 border-t border-slate-700">
        <div className="text-sm truncate" title={user?.email}>Logged in as: <strong>{user?.email}</strong></div>
        <button onClick={signOut} className="w-full px-4 py-2 mt-2 text-sm text-left bg-slate-700 rounded hover:bg-red-600">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;