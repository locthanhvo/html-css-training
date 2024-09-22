interface TModalProps {
  maxW?: string;
  isOpen: boolean;
  title?: string;
  body?: JSX.Element;
  hasCloseButton?: boolean;
  onClose?: () => void;
}

const CustomModal = ({
  maxW = 'fit-content',
  isOpen,
  body,
  title = '',
  hasCloseButton = false,
  onClose,
}: TModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`relative bg-iceBlue shadow-lg rounded-lg p-4 min-w-[320px] ${maxW}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <h2
            className={`text-lg font-semibold ${!hasCloseButton ? 'mx-auto' : ''}`}
          >
            {title}
          </h2>
          {hasCloseButton && (
            <button
              onClick={onClose}
              className="p-1 text-sm rounded-full hover:bg-gray-200"
            >
              &times;
            </button>
          )}
        </div>
        {body && <div className="px-2">{body}</div>}
      </div>
    </div>
  );
};

export default CustomModal;
