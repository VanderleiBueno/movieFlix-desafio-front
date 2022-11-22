import { ReactComponent as Star } from 'assets/images/star.svg';
import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'type/review';
import { requestBackend } from 'util/requests';
import './styles.css';

type urlParams = {
  movieId: string
}

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

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

return (
    <>
      <div className="base-home form-container">
        <div className="base-card card-container1">
          <h1>Tela detalhes do filme id: {movieId}</h1>
          <ReviewForm movieId={movieId} />
        </div>
        <div className="base-card card-container2">
          {reviews.map((reviews) => (
            <div className="reviews-container" key={reviews.id}>
              <h1>{<Star />}{" " + reviews.user.name}</h1>
              <h3>{reviews.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
