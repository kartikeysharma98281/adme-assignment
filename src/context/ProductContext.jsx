import  { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  return (
    <ProductContext.Provider value={{ products, setProducts, category, setCategory, sortOrder, setSortOrder }}>
      {children}
    </ProductContext.Provider>
  );
};
