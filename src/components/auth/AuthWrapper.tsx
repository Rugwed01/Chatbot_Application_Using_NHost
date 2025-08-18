import React, { useState } from 'react';
import { useAuthenticationStatus } from '@nhost/react';
import { ChatProvider } from '../../hooks/useChat';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ChatInterface from '../chat/ChatInterface';

const AuthWrapper: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <ChatProvider>
        <ChatInterface />
      </ChatProvider>
    );
  }

  return isSignUp ? (
    <SignUp onToggleMode={() => setIsSignUp(false)} />
  ) : (
    <SignIn onToggleMode={() => setIsSignUp(true)} />
  );
};

export default AuthWrapper;