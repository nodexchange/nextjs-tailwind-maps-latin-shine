import React from 'react';

/**
 * ContentSection - Reusable section wrapper
 * Provides consistent styling for sections within pages
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render
 * @param {string} props.align - Text alignment ('left', 'center', 'right')
 * @param {string} props.background - Background variant ('dark', 'course', 'about', 'instructors', 'white', 'black')
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullWidth - Whether to use full width
 * @param {string} props.id - Section ID for navigation/anchoring
 * @param {Object} props.style - Additional inline styles
 */
const ContentSection = ({ 
  children, 
  align = 'left',
  background = 'dark',
  className = '',
  fullWidth = false,
  id,
  ...props 
}) => {
  // Base classes for consistent layout
  const baseClasses = 'py-10 md:py-10 lg:py-30 justify-between md:items-start';
  const paddingClasses = fullWidth ? 'w-full px-8 lg:px-30 xl:px-40' : 'px-8 lg:px-30 xl:px-40';
  
  // Background variants
  const backgroundVariants = {
    dark: 'bg-almostBlack text-white',
    course: 'bg-no-repeat bg-cover bg-courseImage text-white',
    about: 'bg-no-repeat bg-cover bg-aboutImage text-white',
    instructors: 'bg-no-repeat bg-cover bg-instructorsImage text-white',
    white: 'bg-white text-almostBlack',
    black: 'bg-black text-white',
    gradient: 'bg-gradient-to-r from-shine to-shineDark text-white',
    transparent: ''
  };
  
  // Text alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  const classes = [
    alignmentClasses[align],
    backgroundVariants[background],
    baseClasses,
    paddingClasses,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <section className={classes} id={id} {...props}>
      {children}
    </section>
  );
};

export default ContentSection; 