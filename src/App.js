import './App.css';
import { MoviesList } from './pages/Movies/MoviesList';
import { Switch, Route } from "react-router-dom";
import { MoviesAddForm } from './pages/Movies/MoviesAddForm';

function App() {
  return (
      <Switch>
         <Route exact path="/" component={MoviesList} />
         <Route path="/add" component={MoviesAddForm } />
      </Switch>
  );
}

export default App;
