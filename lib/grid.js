import { WIDGET_SIZES } from './constants';

export const getResponsiveClasses = (size) => {
  const sizeConfig = WIDGET_SIZES[size];
  if (!sizeConfig) return WIDGET_SIZES.FULL.DEFAULT;

  return Object.values(sizeConfig).join(' ');
};

export const getGridContainerClasses = () => {
  return [
    'grid',
    'grid-cols-12',
    'gap-4',
    'sm:gap-6',
    'md:gap-6',
    'lg:gap-8',
    'auto-rows-min'
  ].join(' ');
};