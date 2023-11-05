import { ReactNode } from 'react';
import ThemeProvider from './theme';
import AuthProvider from './auth';
import CartProvider from './cart';

type Props = {
  children: ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
