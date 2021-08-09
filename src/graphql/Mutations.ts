import { gql } from "@apollo/client"


export const ADD_MOVIES = gql`
mutation addMovie(
    $name: String!
    $genre: String!
  ) {
    addMovie(
      name: $name
      genre: $genre
    ) {
      id
    }
  }
`

export const UPDATE_MOVIES = gql`
mutation updateMovie (
  $id: ID!
  $name: String!
  $genre: String!
) {
  updateMovie(
    id: $id
    name: $name
    genre: $genre
  ) {
    id
  }
}
`

export const REMOVE_MOVIES = gql`
mutation deleteMovie (
  $id: ID!
) {
  deleteMovie(
   id: $id
  ) {
    id
  }
}
`