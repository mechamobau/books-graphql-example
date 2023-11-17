import { gql, useQuery } from '@apollo/client';
import './Books.css';

const BOOKS_QUERY = gql`
  query BooksQuery {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

function Books() {
  const { data, loading, error } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Carregando</p>;

  if (error) return <p>Oops! Deu erro!</p>;

  return (
    <section>
      <h1>Livros</h1>
      {data.books.map(({ title, id, author }) => (
        <div className="book-item" key={id}>
          <p className="book-item__title">{title}</p>
          <small className="book-item__author">{author.name}</small>
        </div>
      ))}
    </section>
  );
}

export default Books;
