import { gql } from "@apollo/client"

const BOOK_DETAIL = gql`
  fragment BookDetail on Book {
    title
    published
    author {
      name
      id
    }
    id
    genres
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const ALL_BOOKS_GENRE = gql`
  query AllBooks($genre: String!){
    allBooks(genre: $genre){
      ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const CREATE_BOOK = gql`
mutation createBook(
  $title: String!
  $author: String!
  $published: Int!
  $genres: [String!]!
) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password){
            value
        }
    }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ME = gql`
  query Me{
    me{
        username
        favouriteGenre
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`