import { FC, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import cx from 'classnames';
import { Breakpoints } from '../config/breakpoints';

type Layout = 'cover' | 'contain' | 'fill' | 'undefined';

const LAYOUT: Record<Layout, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  undefined: '',
};

const DEFAULT_SIZES = `(max-width: ${getBreakpointWidth(
  'md'
)}px) 96vw, (max-width: ${getBreakpointWidth(
  'lg'
)}px) 96vw, (max-width: ${getBreakpointWidth('xl')}px) 96vw`; // Size of an image that spans the full width of screen

function getBreakpointWidth(name: string) {
  const breakpoint = Breakpoints.find((bp) => bp.name === name);
  return breakpoint ? breakpoint.width : undefined;
}

interface OptimisedImageProps extends Omit<ImageProps, 'layout' | 'width'> {
  src: string;
  alt: string;
  layout?: Layout;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}

export const OptimisedImage: FC<OptimisedImageProps> = ({
  src,
  alt,
  layout = 'contain',
  sizes = DEFAULT_SIZES,
  className,
  imgClassName,
  ...props
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div
      className={cx('next-image-container relative transform-gpu', className)}>
      {/* Do not optimise gif images */}
      {src.includes('.gif') ? (
        <>
          <Image
            src={src}
            alt={alt}
            className={cx('w-full', className)}
            {...props}
          />
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          quality={100}
          fill
          onLoadingComplete={() => setHasLoaded(true)}
          className={cx(
            'next-image transition-opacity',
            imgClassName,
            LAYOUT[layout as Layout],
            {
              'opacity-100': hasLoaded,
              'opacity-0': !hasLoaded,
            }
          )}
          {...props}
        />
      )}
    </div>
  );
};
