import { Container } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import { Link } from "react-router-dom";
import { GetMovies } from "./GetMovies";

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
  fab: {  
    margin: theme.spacing(2),
  },
}));

export const MoviesList = (): JSX.Element =>  {
  const classes = useStyles();

return( 
    <Container>
      <Link
         to="/add"
         style={{textDecoration: "none"}}
      >
      <Tooltip title="Add Movie" aria-label="add">
        <Fab color="secondary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      </Link>
     <GetMovies />
    </Container>
)
}