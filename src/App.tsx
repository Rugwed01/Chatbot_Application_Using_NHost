import React from 'react';

// Import the standard providers and the Nhost client
import { NhostProvider, NhostClient } from '@nhost/react';
import { ApolloProvider } from '@apollo/client';

// Import the SPECIAL FUNCTION from @nhost/apollo
import { createApolloClient } from '@nhost/apollo';

import AuthWrapper from './components/auth/AuthWrapper';

// Create the Nhost client first, as it's needed to create the Apollo client
const nhost = new NhostClient({
  subdomain: 'zpolidinyskxbyyersmo',
  region: 'ap-south-1',
});

// Use the function from @nhost/apollo to create a perfectly configured Apollo client
const apolloClient = createApolloClient({ nhost });

function App() {
  return (
    // We need BOTH providers.
    // NhostProvider provides authentication context.
    <NhostProvider nhost={nhost}>
      {/* ApolloProvider provides the GraphQL context, using the client we just made. */}
      <ApolloProvider client={apolloClient}>
        <div className="min-h-screen bg-slate-900">
          <AuthWrapper />
        </div>
      </ApolloProvider>
    </NhostProvider>
  );
}

export default App;