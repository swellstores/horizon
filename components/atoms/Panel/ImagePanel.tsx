import Image from 'components/atoms/SafeImage';
import type { PanelImageProps } from './Panel';

const ImagePanel: React.FC<PanelImageProps> = ({ image, className }) => {
  return (
    <Image
      layout="responsive"
      {...image}
      className={['w-full object-cover object-center', className].join(' ')}
      alt={image.alt}
    />
  );
};

export default ImagePanel;
