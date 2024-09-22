export type TField<T> = {
  key: string;
  name: keyof T;
  label: string;
  placeholder: string;
  rules: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  ariaLabel: string;
  icon: () => JSX.Element;
  customClass?: string;
};
