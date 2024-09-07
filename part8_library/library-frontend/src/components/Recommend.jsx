import { useQuery } from "@apollo/client"
import _ from 'lodash'
import { ALL_BOOKS, ME } from "../../queries"

const Recommend = ( {show} ) => { //eslint-disable-line
  const meResult = useQuery(ME, {fetchPolicy: false})
  const books = useQuery(ALL_BOOKS, {fetchPolicy: false})

  if(meResult.loading || meResult.error || books.loading || books.error){
    return <>Loading</>
  }
  if(!show){
    return null
  }

  console.log('me', meResult)
  const filted = _.compact(books.data.allBooks.map(book => book.genres.includes(meResult.data.me.favouriteGenre) ? book : null))

  return (
    <div>
        <h1>Recommendations</h1>
        books in your favourite genre <b>{meResult.data.me.favouriteGenre}</b>    
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filted.map( //eslint-disable-line
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
    </div>
  )

}


export default Recommend