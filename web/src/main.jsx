import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import Books from './components/Books';
import Authors from './components/Authors';
import NewAuthor from './components/NewAuthor';
import NewBook from './components/NewBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Books />,
  },
  {
    path: 'authors',
    element: <Authors />,
  },
  {
    path: 'author/new',
    element: <NewAuthor />,
  },
  {
    path: 'book/new',
    element: <NewBook />,
  },
]);

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
