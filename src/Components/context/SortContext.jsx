import { useContext, useState, createContext } from "react";

const SortContext = createContext("asc");

const SortProvider = ({ children }) => {
  const [sort, setSort] = useState("asc");

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
};

const useSort = () => {
  return useContext(SortContext);
};

export { SortProvider, useSort };
