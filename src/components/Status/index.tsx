import { StatusType } from "@types";
import "./status.css";
interface Props {
  status: StatusType;
}

const StatusUser = ({ status }: Props) => {
  return (
    <div className={`d-flex status status-${status.toLocaleLowerCase()}`}>
      <span className={`dot-icon dot-icon-${status.toLocaleLowerCase()}`} />
      <p>{status}</p>
    </div>
  );
};

export default StatusUser;
