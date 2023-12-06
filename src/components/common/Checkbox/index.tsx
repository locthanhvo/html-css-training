import "./checkbox.css";

interface CheckboxProps {
  checkboxId: string;
  title?: string;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checkboxId, title, onCheckboxChange }: CheckboxProps) => {
  return (
    <div className="checkbox">
      <label htmlFor={`checkbox-item`}>{title}</label>
      <input
        className="checkbox-item"
        type="checkbox"
        onChange={onCheckboxChange}
        id={checkboxId}
      />
    </div>
  );
};

export default Checkbox;
