import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import { REMOVE_MOVIES } from "../../graphql/Mutations";
import { LOAD_MOVIES } from "../../graphql/Queries";
import { MoviesUpdateForm } from "./MoviesUpdateForm";

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) =>({
  root: {
    maxWidth: 400,
    margin: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

interface Movies {
  id: string,
  name: string,
  genre: string,
  open: boolean,
}

interface MoviesData {
  movies: Movies[] 
}

interface MovieIndex {
    id: string,
    name: string,
    genre: string,
}


export const GetMovies = () => {
  // const [movies, setMovies] = useState({});
  const [movie, setMovie] = useState<MovieIndex|null>(null);
  const [open, setOpen] = useState(false);
  const { error, loading, data } = useQuery<MoviesData>(LOAD_MOVIES);
  const [deleteMovie] = useMutation(REMOVE_MOVIES);
  const classes = useStyles();

  // useEffect(() => {
  //   if (data) {
  //     setMovies(data.movies);
  //   }
  // }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id: string) => {
    const index = data?.movies.filter(item => item.id === id)
    index && setMovie(index[0])
      setOpen(true)
    }
   
  const removeMovies = (id: string) => {
    deleteMovie({
      variables: { id: id },
      refetchQueries: [{query: LOAD_MOVIES}]
    });
    if (error) {
      console.log(error);
    }
  };

  if (loading) return <>Loading...</>
  if (error) return <>`Error! ${error.message}`</>
  
  return (
    <>
      {data?.movies.map((item) => (
        <Card key={item.id} className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt=' '
          height="140"
          image={item.img}
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.genre}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => removeMovies(item.id)}
      >
        Remove Movie
      </Button>
      <Button
        variant="contained"
        color="default"
        startIcon={<EditIcon />}
        onClick={() => handleOpen(item.id)}
      >
        Update Movie
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div>
         <MoviesUpdateForm movie={movie}/>
         </div>
      </Modal>
      </CardActions>
    </Card>
       ))}   
    </>
  );
}

