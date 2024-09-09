'use client';

import cn from 'classnames';
import type React from 'react';
import { type ButtonHTMLAttributes, forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import styles from './Button.module.css';
import { LoadingSpinner } from '@/components/ui';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat';
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef(null);
  const rootClassName = cn(
    styles.root,
    {
      [styles.slim as string]: variant === 'slim',
      [styles.loading as any]: loading,
      [styles.disabled as any]: disabled,
    },
    className,
  );
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="flex pl-2 m-0">
          <LoadingSpinner />
        </i>
      )}
    </Component>
  );
});
Button.displayName = 'Button';

export default Button;
