import { Link } from 'react-router-dom';

import './styles.css';

const MovieCatalog = () => {
  return (
    <div className="base-home films-container">
      <div className="column">
        <div>
          <h1>Tela listagem de filmes</h1>
        </div>
        <div>
          <Link to="/movies/1" className="films-link">
            Acessar /movies/movies1
          </Link>
        </div>
        <div>
          <Link to="/movies/2" className="films-link">
            Acessar /movies/movies2
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCatalog;
