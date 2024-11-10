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
      {message && <Text style={loaderStyles.message}>{message}</Text>}
    </div>
  );
};


const loaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: "300px", 
    gap: '8px',
    padding: '20px',
  },
  message: {
    fontSize: '16px',
    color: '#6c757d', 
  },
};

export default Loader;
