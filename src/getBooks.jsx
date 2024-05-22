import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';


const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      pages {
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;
export default GET_BOOKS;