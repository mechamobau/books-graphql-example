import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

export const AUTHORS_QUERY = gql`
  query AuthorsQuery {
    authors {
      id
      name
    }
  }
`;

function Authors() {
  const { data, loading, error } = useQuery(AUTHORS_QUERY);

  if (loading) return <p>Carregando</p>;

  if (error) return <p>Oops! Deu erro!</p>;

  return (
    <section>
      <div>
        <h1>Autores</h1>
        <Link to="/author/new">Novo Autor</Link>
      </div>
      {data.authors.map(({ name, id }) => (
        <p key={id} id={id}>
          {name}
        </p>
      ))}
    </section>
  );
}

export default Authors;
