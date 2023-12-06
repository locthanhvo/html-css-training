import Avatar from "@components/common/Avatar";
import Checkbox from "@components/common/Checkbox";
import Heading from "@components/common/Heading";
import StatusUser from "@components/Status";
import Text from "@components/common/Text";
import { formatDate } from "@helpers";
import { CheckBox, User } from "@types";
import "./userCard.css";
import { Colors, FontSize } from "@themes";
import EditIcon from "@components/Icons/EditIcon";
import DeleteIcon from "@components/Icons/DeleteIcon";
import EmptyIcon from "@components/Icons/EmptyIcon";
import Button from "@components/common/Button";

interface UserCardProps {
  data: User[];
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string) => void;
  onChangeCheckbox: ({ isChecked, checkboxId }: CheckBox) => void;
}

const UserCard = ({
  data,
  onClickDelete,
  onClickEdit,
  onChangeCheckbox,
}: UserCardProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    onChangeCheckbox({ isChecked: checked, checkboxId: id });
  };

  const renderCard = data.map((item) => {
    const { id, firstName, lastName, email, status, createdAt, avatar } = item;
    return (
      <ul className="card-list d-flex" key={id}>
        <li className="card-heading d-flex">
          <div className="card-name d-flex">
            <Avatar
              url={avatar}
              firstName={firstName}
              lastName={lastName}
              name={`${firstName} ${lastName}`}
            />
            <div>
              <Heading tag="h2" content={`${firstName} ${lastName}`} />
              <Text content={`@${firstName}`} color={Colors.GreyDark} />
            </div>
          </div>
          <Checkbox checkboxId={id} onCheckboxChange={handleCheckboxChange} />
        </li>
        <li className="card-info d-flex">
          <Text content="Status" color={Colors.GreyDark} />
          <StatusUser status={status} />
        </li>
        <li className="card-info d-flex">
          <Text content="E-mail" color={Colors.GreyDark} />
          <Text content={email} color={Colors.Black} />
        </li>
        <li className="card-info d-flex">
          <Text content="Date" color={Colors.GreyDark} />
          <Text content={formatDate(createdAt)} color={Colors.Black} />
        </li>
        <li className="d-flex card-action">
          <Button variants="default" onClick={() => onClickEdit(id)}>
            <EditIcon />
          </Button>
          <Button variants="default" onClick={() => onClickDelete(id)}>
            <DeleteIcon />
          </Button>
        </li>
      </ul>
    );
  });

  return (
    <div className="card-user">
      {data.length ? (
        renderCard
      ) : (
        <div className="card-empty d-flex flex-center">
          <EmptyIcon />
          <Text
            content="No Data"
            color={Colors.Black}
            fontSize={FontSize.Medium}
          />
        </div>
      )}
    </div>
  );
};

export default UserCard;
