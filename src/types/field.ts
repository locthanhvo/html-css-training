export type TField = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  rules: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  ariaLabel: string;
};
