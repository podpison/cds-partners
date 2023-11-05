import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

type ContextType = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

export const authContext = createContext<ContextType>({
  auth: false,
  setAuth: () => {},
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    navigate(auth ? '/' : '/login');
  }, [auth, navigate]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
