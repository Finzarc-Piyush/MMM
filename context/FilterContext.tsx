import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FilterContextProps {
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedGeography: string;
  setSelectedGeography: (geography: string) => void;
  selectedPackRange: string;
  setSelectedPackRange: (packRange: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('selectedBrand') || 'All';
    }
    return 'All';
  });

  const [selectedGeography, setSelectedGeography] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('selectedGeography') || 'All';
    }
    return 'All';
  });

  const [selectedPackRange, setSelectedPackRange] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('selectedPackRange') || 'All';
    }
    return 'All';
  });

  useEffect(() => {
    sessionStorage.setItem('selectedBrand', selectedBrand);
    sessionStorage.setItem('selectedGeography', selectedGeography);
    sessionStorage.setItem('selectedPackRange', selectedPackRange);
  }, [selectedBrand, selectedGeography, selectedPackRange]);

  return (
    <FilterContext.Provider value={{ selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
