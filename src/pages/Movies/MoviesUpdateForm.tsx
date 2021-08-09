import { useMutation } from "@apollo/client";
import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { UPDATE_MOVIES } from "../../graphql/Mutations";
import { LOAD_MOVIES } from "../../graphql/Queries";

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; palette: { text: { secondary: any; }; }; }) => ({
  paper: {
    width: 700,
    padding: theme.spacing(5),
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
  genre: string;
}

interface MoviesProps {
  movie: {
    id: string;
    name: string;
    genre: string;
  } | null
}

export const MoviesUpdateForm = ({movie}: MoviesProps) => {
  const [name, setName] = useState(movie?.name);
  const [genre, setGenre] = useState(movie?.genre);
  const [updateMovie, { error }] = useMutation<{updateMovie: MoviesDetails}>(UPDATE_MOVIES);
  const classes = useStyles();
  
  const updateMovies = (id: string | undefined) => {
   id &&
    updateMovie({
      variables: {
        id: id,
        name: name,
        genre: genre,
        open: Boolean,
      },
      refetchQueries: [{query: LOAD_MOVIES}]
    });
    if (error) {
      console.log(error);
    }    
  }

  return (
    <Paper className={classes.paper}>
    <form onSubmit={() => updateMovies(movie?.id)}>
      <TextField
        className={classes.field}
        size="small"
        variant="outlined"
        label="Name"
        value={name || ''}
        onChange={(e: { target: { value: any; }; }) => {
          setName(e.target.value);
        }}
      />
      <TextField
        className={classes.field}
        size="small"
        variant="outlined"
        label="Genre"
        value={genre || ''}
        onChange={(e: { target: { value: any; }; }) => {
          setGenre(e.target.value);
        }}
      />
      <Button 
      className={classes.button} 
      variant="contained" 
      type="submit">
         Update Movie
         </Button>
    </form>
    </Paper>
  );
}

