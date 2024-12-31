import React, { createContext, useContext, useState, ReactNode } from "react";

type Cache = {
  [key: string]: any; // You can replace `any` with a more specific type if known
};

type CacheContextType = {
  getCacheData: (key: string) => any; // Replace `any` with the type of your cached data
  setCacheData: (key: string, data: any) => void; // Replace `any` if data type is consistent
};

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<Cache>({});

  const setCacheData = (key: string, data: any) => {
    setCache((prev) => ({ ...prev, [key]: data }));
  };

  const getCacheData = (key: string): any => cache[key];

  return (
    <CacheContext.Provider value={{ getCacheData, setCacheData }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
};
