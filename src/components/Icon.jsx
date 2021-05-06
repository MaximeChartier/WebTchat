import React from 'react';
/**
 * Icône basé sur la sprite SVG
 * @param {{name: string}} props
 */
export function Icon ({ name, size }) {
  const className = `icon icon-${name}`
  return (
    <svg className={className} width={size} height={size}>
    </svg>
  )
}
