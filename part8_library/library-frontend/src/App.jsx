import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery, useMutation, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from "../queries";
import { LOGIN } from "../queries";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  console.log('the addedBook is ',addedBook)
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.bookAdded
      console.log('what is going on', addedBook)
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
    },
    onError: (error) => {
      console.error('Subscription error:', error);
    }
  })

  console.log('client',client)

  const authorResult = useQuery(ALL_AUTHORS);

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  if (authorResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div style={{display: 'flex'}}>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          {!token 
          ? <button onClick={() => setPage('login')}>log in</button> 
          : <div>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>log out</button>
          </div>}
        </div>


      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken}/>

      <Authors
        show={page === "authors"}
        authors={authorResult.data.allAuthors}
      />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === 'recommend'} />

    </div>
  );
};

export default App;
