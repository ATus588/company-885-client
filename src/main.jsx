import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AuthProvider } from './context/auth'

const ADMIN_SECRET = 'company885'


const client = new ApolloClient({
  uri: 'http://localhost:8089/v1/graphql',
  headers: {
    'x-hasura-admin-secret': ADMIN_SECRET
  },
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}><App /></ApolloProvider>
    </AuthProvider>
  </React.StrictMode>,
)
