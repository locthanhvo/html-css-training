export interface IInputField<T> {
  field: keyof T;
  data: string;
  isError: boolean;
  onChange: (value: string) => void;
}

export interface ISelectField<T> {
  field: keyof T;
  data: { name: string; image?: string; value: string }[];
  isError: boolean;
  onChange: (value: string[]) => void;
}
