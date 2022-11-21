import { Router, Switch, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import history from 'util/history';
import Home from 'pages/Home';
import MovieCatalog from 'pages/Private/MovieCatalog';
import MovieDetails from 'pages/Private/MovieDetails';
import PrivateRoute from 'components/PrivateRoute';


const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
      <Route path="/movies" exact>
        <MovieCatalog />
      </Route>
      <Route path="/movies/:movieId">
        <MovieDetails />
      </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
