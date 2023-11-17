import { gql, useMutation, useQuery } from '@apollo/client';
import { AUTHORS_QUERY } from './Authors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NEW_BOOK_MUTATION = gql`
  mutation NewBookMutation($title: String!, $author: String!) {
    createBook(input: { title: $title, author: $author }) {
      id
      title
    }
  }
`;

function NewBook() {
  const authorsQuery = useQuery(AUTHORS_QUERY);
  const [newBook, { loading }] = useMutation(NEW_BOOK_MUTATION);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    newBook({
      variables: {
        title,
        author,
      },
    });

    navigate('/');
  };

  return (
    <section>
      <h1>Novo livro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {!authorsQuery.loading && !!authorsQuery.data && (
          <select
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          >
            {authorsQuery.data.authors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        <button type="submit" disabled={loading}>
          Cadastrar livro
        </button>
      </form>
    </section>
  );
}

export default NewBook;
