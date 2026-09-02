import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Loading...',
}) => {
  const sizeClass =
    size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <BiLoaderAlt className={`${sizeClass} loading-spinner text-blue-600`} />
      {text && <p className="text-neutral-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
