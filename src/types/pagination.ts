export interface PaginationTableType {
  arrOfCurrButtons: (number | string)[];
  currentPage: number;
  totalPage: number;
}

export interface TPagination<T> {
  items: number;
  pages: number;
  next: number;
  prev: number;
  data: T[];
}
