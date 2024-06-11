export type TBrigade = {
  id?: string;
  name?: string;
  description?: string;
  commissioner?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TBrigadeList = {
  items: number;
  pages: number;
  next: number;
  prev: number;
  data: TBrigade[];
};
