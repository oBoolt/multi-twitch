import { useContext, useState, createContext } from "react";

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataContextProvider({ children }) {
  const [data, setData] = useState({
    lives: [],
    channel: "",
  });

  const value = {
    data,
    setData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
