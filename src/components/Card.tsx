import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  glass = true,
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={clsx(
        'rounded-2xl shadow-lg border transition-all duration-300',
        glass ? 'bg-white/80 backdrop-blur-sm border-white/20' : 'bg-white border-gray-200',
        hover && 'hover:shadow-xl hover:scale-105',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
