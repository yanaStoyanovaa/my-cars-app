// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [appState, setAppState] = useState({ theme: 'light' });

  const toggleTheme = () => {
    setAppState((prevState) => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <DataContext.Provider value={{ appState, toggleTheme }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
