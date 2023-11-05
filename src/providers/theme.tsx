import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Ubuntu',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
