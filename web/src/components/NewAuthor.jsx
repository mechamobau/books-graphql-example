import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NEW_AUTHOR_MUTATION = gql`
  mutation NewAuthorMutation($newAuthor: String!) {
    createAuthor(input: { name: $newAuthor }) {
      id
      name
    }
  }
`;

function NewAuthor() {
  const [name, setName] = useState('');
  const [createAuthor, { loading }] = useMutation(NEW_AUTHOR_MUTATION, {
    update(cache, { data: { createAuthor } }) {
      cache.modify({
        fields: {
          authors(existingAuthors = []) {
            const createAuthorRef = cache.writeFragment({
              data: createAuthor,
              fragment: gql`
                fragment NewAuthor on Author {
                  id
                  name
                }
              `,
            });
            return [createAuthorRef, ...existingAuthors];
          },
        },
      });
    },
    optimisticResponse: {
      createAuthor: {
        id: 'temp-id',
        name,
        __typename: 'Author',
      },
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    createAuthor({
      variables: {
        newAuthor: name,
      },
    });

    navigate('/authors');
  };

  return (
    <section>
      <h1>New Author</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          Cadastrar
        </button>
      </form>
    </section>
  );
}

export default NewAuthor;
