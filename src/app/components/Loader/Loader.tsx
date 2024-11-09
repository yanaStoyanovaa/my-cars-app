// Loader.tsx
'use client';
import { Spinner, Text } from '@radix-ui/themes';
import React from 'react';

interface LoaderProps {
  message?: string; // Optional message to display below the spinner
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div style={loaderStyles.container}>
      <Spinner size="3" />
      {message && <Text style={loaderStyles.message}>{message}</Text>}
    </div>
  );
};

// Inline styles for the loader
const loaderStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: "300px", // Full height if used to cover an area
    gap: '8px',
    padding: '20px',
  },
  message: {
    fontSize: '16px',
    color: '#6c757d', // Muted color for message text
  },
};

export default Loader;
