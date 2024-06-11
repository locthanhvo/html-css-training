export type TField<T> = {
  name: keyof T;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password' | 'datetime-local';
  elementType?: 'dropdown' | 'input';
  rules: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  ariaLabel: string;
};
