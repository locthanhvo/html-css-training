import SpinnerIcon from "@components/Icons/SpinnerIcon";
import "./loadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="toggle d-flex flex-center">
      <SpinnerIcon />
    </div>
  );
};

export default LoadingIndicator;
