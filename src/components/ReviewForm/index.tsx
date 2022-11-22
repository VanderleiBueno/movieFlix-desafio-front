import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  movieId: string;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId }: Props) => {
  
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
        console.log('SUCESSO AO SALVAR', response);
      })
      .catch((error) => {
        console.log('ERRO AO SALVAR', error);
      });
  };

  return (
    <div>
      <div className="card-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
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
            <div className="login-submit">
              <ButtonIcon text="Salvar Avaliação" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
