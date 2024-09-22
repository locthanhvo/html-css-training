import { Button } from '@/components';

interface ConfirmModalProps {
  title?: string;
  itemName?: string;
  isDisabled?: boolean;
  onConfirm?: () => void;
  onCloseModal?: () => void;
}
const ConfirmModal = ({
  title = '',
  itemName = '',
  isDisabled = false,
  onConfirm,
  onCloseModal,
}: ConfirmModalProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3">
        <p className="text-base">{title}</p>
        <span className="text-red-500 ml-1 font-semibold">{itemName}</span>
      </div>

      <div className="flex gap-3">
        <Button title="Cancel" onClick={onCloseModal} />
        <Button
          size="md"
          title="Confirm"
          onClick={onConfirm}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
