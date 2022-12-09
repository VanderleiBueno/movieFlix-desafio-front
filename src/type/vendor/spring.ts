export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    number: number;
    numberOfElements?: number;
    size: number;
    empty: boolean;
  };