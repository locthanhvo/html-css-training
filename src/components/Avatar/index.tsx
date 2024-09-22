import { generateRGBDataURL } from '@/utils';
import Image, { StaticImageData } from 'next/image';

interface AvatarProps {
  src: string | StaticImageData;
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

const Avatar = ({
  src = '',
  sizes = '28px',
  width = 7,
  height = 7,
  fill = true,
}: AvatarProps) => {
  return (
    <div
      className={`rounded-full bg-primary w-${width} h-${height} relative overflow-hidden`}
    >
      <Image
        src={src}
        fill={fill}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={generateRGBDataURL(64, 64, 64)}
        alt="avatar"
        priority
        className="rounded-full bg-lightgray bg-center bg-cover bg-no-repeat"
      />
    </div>
  );
};

export default Avatar;
