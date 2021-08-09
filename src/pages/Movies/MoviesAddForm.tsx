import { useMutation } from "@apollo/client";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ADD_MOVIES } from "../../graphql/Mutations";
import { LOAD_MOVIES } from "../../graphql/Queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  field: {
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  }
}));


interface MoviesDetails {
  id: string;
  name: string;
  genre: number;
}

export const MoviesAddForm = (): JSX.Element => {
  const [name, setName] = useState(" ");
  const [ genre, setGenre] = useState(" ");
  const [addMovie, { error }] = useMutation<{addMovie: MoviesDetails}>(ADD_MOVIES);
  let history = useHistory();
  const classes = useStyles();

  const addMovies = () => {
    addMovie({
      variables: {
        name: name,
        genre: genre,
      },
      refetchQueries: [{query: LOAD_MOVIES}]
    });
    if (error) {
      console.log(error);
    }
    setName(" ")
    setGenre(" ")
    history.push("/");
  };

  return (
    <Grid 
      container
      justifyContent="center"
      alignItems="center">
    <Paper className={classes.paper}>
    <form onSubmit={addMovies}>
      <TextField
        className={classes.field}
        size="small"
        variant="outlined"
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        className={classes.field}
        size="small"
        variant="outlined"
        label="Genre"
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value);
        }}
      />
      <Button 
      className={classes.button} 
      variant="contained" 
      type="submit">
        Add Movie
        </Button>
    </form>
    </Paper>
  </Grid>
  );
}

