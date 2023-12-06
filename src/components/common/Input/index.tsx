import "./input.css";

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChangeInput,
}: InputFieldProps) => (
  <input
    type={type}
    id={name}
    name={name}
    placeholder={placeholder}
    className="input-item item-validate"
    value={value}
    onChange={onChangeInput}
  />
);

export default Input;
