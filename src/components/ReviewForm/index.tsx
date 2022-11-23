import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { Review } from 'type/review';
import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

     const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        console.log('SUCESSO AO SALVAR', response);
      })
      .catch((error) => {
        console.log('ERRO AO SALVAR', error);
      });
  };

  return (
    <div>
      <div className="review-form-card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="review-form-input-container">
            <input
              {...register('text', {
                required: 'Campo obrigatório',
              })}
              type="text"
              name="text"
              placeholder="Deixe sua avaliação aqui"
            />
          </div>
          <div>{errors.text?.message}</div>
          <div>
            <div className="review-form-login-submit">
              <ButtonIcon text="Salvar Avaliação" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
