import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const SET_BIRTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = ({ show, authors }) => {//eslint-disable-line

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [selectedOption, setOption] = useState(null);

  const [editAuthor] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    if (!selectedOption) {
      return;
    } else {
      await editAuthor({
        variables: { name: selectedOption.value, setBornTo: parseInt(birth) },
      });
      setName("");
      setBirth("");
    }
  };

  const options = authors.map((author) => { //eslint-disable-line
    return { value: author.name, label: author.name };
  });
  console.log(options);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map( //eslint-disable-line
            (
              a, 
            ) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <div>
        <Select
          defaultValue={selectedOption}
          onChange={setOption}
          options={options}
        />
        <form onSubmit={submit}>
          <div>
            birthyear
            <input
              value={birth}
              onChange={({ target }) => setBirth(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
