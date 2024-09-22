import { StaticImageData } from 'next/image';

import { Avatar } from '@/components';

interface CardItemProps {
  src: string | StaticImageData;
  name: string;
  email: string;
}

const CartItem = ({ src, name, email }: CardItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={src} />
      <div className="flex flex-col">
        <p className="font-medium text-white text-[10px]">{name}</p>
        <span className="text-secondary font-medium text-[10px]">{email}</span>
      </div>
    </div>
  );
};
export default CartItem;
