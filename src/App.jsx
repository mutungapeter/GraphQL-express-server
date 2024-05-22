import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import client from './client';
import BookList from './components/BookList'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <ApolloProvider client={client}>
    <div className="App">
      <h1 className='mb-10'>Book reader</h1>
      <BookList />
    </div>
  </ApolloProvider>
      </div>
     
    </>
  )
}

export default App
