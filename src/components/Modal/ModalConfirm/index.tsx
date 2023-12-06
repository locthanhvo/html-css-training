import Modal from "@components/Modal";
import "./modalConfirm.css";
import Text from "@components/common/Text";
import { Colors, FontSize, FontWeight } from "themes";

interface ConfirmProps {
  title: string;
  message: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCloseConfirm: () => void;
}

const Confirm = ({
  title,
  message,
  isLoading,
  onConfirm,
  onCloseConfirm,
}: ConfirmProps) => {
  return (
    <Modal
      title={title}
      isDisplay={isLoading}
      onCloseModal={onCloseConfirm}
      onSubmitModal={onConfirm}
      primaryTitle="Confirm"
    >
      <div className="confirm-content">
        <div className="confirm-body">
          <Text
            content={message}
            color={Colors.Black}
            fontWeight={FontWeight.Bold}
            fontSize={FontSize.Medium}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
