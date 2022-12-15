import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'type/genre';
import { requestBackend } from 'util/requests';

import './styles.css';

export type GenreFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: GenreFilterData) => void;
};

const GenreFilter = ({ onSubmitFilter }: Props) => {
  const [selectCategories, setSelectCategories] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control, } =
    useForm<GenreFilterData>();

  const onSubmit = (formData: GenreFilterData) => {
    console.log("enviou", formData);
    onSubmitFilter(formData);
  };

  const handleChangeCategory = (value: Genre) => {
    setValue('genre', value);

    const obj: GenreFilterData = {
      genre: getValues('genre'),
    };
    console.log("trocou", obj);
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/genres' , withCredentials: true}).then((response) => {
      setSelectCategories(response.data);
    });
  }, []);

  return (
    <div className="base-card genre-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="genre-filter-form">
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  placeholder="Genero"
                  classNamePrefix="genre-filter-select"
                  onChange={(value) => handleChangeCategory(value as Genre)}
                  getOptionLabel={(genre: Genre) => genre.name}
                  getOptionValue={(genre: Genre) => String(genre.id)}
                />
              )}
            />
      </form>
    </div>
  );
};

export default GenreFilter;