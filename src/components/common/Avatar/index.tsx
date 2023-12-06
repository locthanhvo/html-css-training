import { IMAGE_URL_REGEX } from "@constants";
import "./avatar.css";
import { getFirstLetterFullName } from "@helpers";
interface Props {
  url?: string;
  name?: string;
  firstName: string;
  lastName: string;
}

const Avatar = ({ url, name, lastName, firstName }: Props) => {
  return (
    <div className="avatar d-flex flex-center">
      {url && IMAGE_URL_REGEX.test(url) ? (
        <img className="avatar-item" src={url} alt={name} />
      ) : (
        <p className="d-flex flex-center avatar-item avatar-name">
          {getFirstLetterFullName(firstName, lastName)}
        </p>
      )}
    </div>
  );
};

export default Avatar;
