/*import { Link } from 'react-router-dom';

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
*/

import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import GenreFilter, { GenreFilterData } from 'components/GenreFilter';
import { useState, useEffect, useCallback } from 'react';
import { Movie } from 'type/movie';
import { SpringPage } from 'type/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: GenreFilterData;
}

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] = 
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData})
  };
  
  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: "/movies",
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id
      },
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      });
  } , [controlComponentsData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div  className="base-home product-crud-container">
      <div className="product-crud-bar-container">
        <GenreFilter onSubmitFilter={handleSubmitFilter}/>
      </div>
      <div className="row">
          {page?.content.map(movie => (
          <div key={movie.id} className="col-sm-6 col-md-6 col-xl-3">
            <img src={movie.imgUrl} alt={movie.title} />
            <h1>{movie.title}</h1>
            <h3>{movie.year}</h3>
            <h3>{movie.subTitle}</h3>
          </div>
          ))}
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={(page) ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange} 
      />
    </div>
  );
};

export default MovieCatalog;
