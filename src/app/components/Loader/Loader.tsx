'use client';
import { Spinner, Text } from '@radix-ui/themes';
import React from 'react';

interface LoaderProps {
  message?: string; 
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div style={loaderStyles.container}>
      <Spinner size="3" />
      {message && <div style={loaderStyles.message}>{message}</div>}
    </div>
  );
};

const loaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '12px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#e0e0e0',
  } as React.CSSProperties,
  message: {
    fontSize: '18px',
    fontWeight: 500 as const,
    color: '#bd8b2d',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  } as React.CSSProperties,
};

export default Loader;
