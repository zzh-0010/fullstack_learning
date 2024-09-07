import { useState } from "react";
import _ from 'lodash'
import { ALL_BOOKS_GENRE } from "../../queries"
import { ALL_BOOKS } from "../../queries";
import { useQuery } from "@apollo/client";



const Books = ({ show }) => {//eslint-disable-line
  const [genre, setGenre] = useState('')

  const allBookResult = useQuery(ALL_BOOKS)
  console.log('what are books now?', allBookResult)
  const genreBookResult = useQuery(ALL_BOOKS_GENRE, {variables: {genre: genre}})


  if (allBookResult.loading || genreBookResult.loading) {
    return <p>Loading...</p>;
  }

  if (allBookResult.error || genreBookResult.error) {
    return <p>Error loading data!</p>;
  }
  
  const allGenres = _.union(_.flatten(allBookResult.data.allBooks.map(book => book.genres))) //所有genre集合
  
  console.log('the genre is :', genre)
  console.log('what are books now?', genreBookResult)



  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreBookResult.data.allBooks.map( //eslint-disable-line
            (
              a, 
            ) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map(genre => {
          return (
            <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
          )
        })}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
