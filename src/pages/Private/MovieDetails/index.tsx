import { ReactComponent as Star } from 'assets/images/star.svg';
import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'type/movie';
import { Review } from 'type/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';
import './styles.css';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [movie, setMovie] = useState<Movie>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <>
      <div className="product-details-container">
        <div className="base-card product-details-card">

          <div className="row">
            <div className="col-xl-6">
                  <div className="img-container">
                    <img src={movie?.imgUrl} alt={movie?.title} />
                  </div>
                  <div className="name-price-container">
                    <h1>{movie?.title}</h1>
                    <h3>{movie?.year}</h3>
                    <h4>{movie?.subTitle}</h4>
                  </div>
            </div>
            <div className="col-xl-6">
                <div className="description-container">
                  <p>{movie?.synopsis}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="base-home form-container">
        <div className="base-card card-container1">
          <h1>Tela detalhes do filme id: {movieId}</h1>
          {hasAnyRoles(['ROLE_MEMBER']) && (
            <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
          )}
        </div>
        <div className="base-card card-container2">
          {reviews?.map((reviews) => (
            <div className="reviews-container" key={reviews.id}>
              <h1>
                {<Star />}
                {' ' + reviews.user.name}
              </h1>
              <h3>{reviews.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
