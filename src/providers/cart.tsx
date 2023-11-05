import { ReactNode, createContext, useState } from 'react';
import { ProductType } from '../pages/main/products/product';

type Props = {
  children: ReactNode;
};

type ContextType = {
  products: ProductType[];
  deleteProduct: (id: number) => void;
  addProduct: (product: ProductType) => void;
};

export const cartContext = createContext<ContextType>({
  products: [],
  addProduct: () => {},
  deleteProduct: () => {},
});

const CartProvider: React.FC<Props> = ({ children }) => {
  const [products, setProucts] = useState<ProductType[]>([]);

  const deleteProduct = (id: number) => {
    setProucts((prev) => prev.filter((i) => i.id !== id));
  };
  const addProduct = (product: ProductType) => {
    setProucts((prev) => [...prev, product]);
  };

  return (
    <cartContext.Provider value={{ products, deleteProduct, addProduct }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
