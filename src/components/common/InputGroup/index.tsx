import { ChangeEvent } from "react";
import "./inputGroup.css";
import Input from "@components/common/Input";

interface InputGroupProps {
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessageField: string;
}

const InputGroup = ({
  name,
  type,
  value,
  placeholder,
  onChangeInput,
  errorMessageField,
}: InputGroupProps) => {
  return (
    <div className="input-group">
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChangeInput={onChangeInput}
      />
      {errorMessageField && (
        <span className={`${name}-error error-message`}>
          {errorMessageField}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
