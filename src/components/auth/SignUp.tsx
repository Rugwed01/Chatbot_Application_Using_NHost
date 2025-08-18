import React, { useState } from 'react';
// --- CHANGE IS HERE ---
import { useNhostClient } from '@nhost/react';

interface SignUpProps {
  onToggleMode: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onToggleMode }) => {
  // --- AND CHANGE IS HERE ---
  const nhost = useNhostClient(); // Correct hook, no curly braces
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const { error } = await nhost.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Create Account</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-slate-400">
          Already have an account?{' '}
          <button onClick={onToggleMode} className="font-medium text-sky-500 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;