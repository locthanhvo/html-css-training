import { EllipseIcon } from '@/icons';

interface StatusProps {
  type?: 'online' | 'offline';
}

const Status = ({ type = 'online' }: StatusProps) => {
  const stateClass =
    type === 'online'
      ? 'bg-springGreen border-green-300'
      : 'bg-ghostWhite border-gray-300';

  return (
    <div
      className={`max-w-[60px] flex items-center justify-center gap-1 px-2 py-1 rounded-sm border-[1px] ${stateClass}`}
    >
      <EllipseIcon color={type === 'online' ? '#05C168' : '#AEB9E1'} />
      <p
        className={`${type === 'online' ? 'text-green-500' : 'text-secondary'} font-medium text-[10px]`}
      >
        {type === 'online' ? 'Online' : 'Offline'}
      </p>
    </div>
  );
};

export default Status;
