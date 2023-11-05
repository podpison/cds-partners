import { Badge, Button, Flex, Image } from 'antd';
import { useContext } from 'react';
import { authContext } from '../providers/auth';
import { useLocation } from 'react-router-dom';
import { cartContext } from '../providers/cart';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  gap: 20,
};
const innerStyle: React.CSSProperties = {
  padding: '20px 0',
  width: '100%',
};
const bgStyle: React.CSSProperties = {
  background: 'white',
  width: '200vw',
  height: '100%',
  position: 'absolute',
  left: '-100vw',
};

const restrictedPages = ['/login'];

const Header: React.FC = () => {
  const location = useLocation();
  const { setAuth } = useContext(authContext);
  const { products } = useContext(cartContext);

  const logOut = () => {
    setAuth(false);
  };

  if (restrictedPages.includes(location.pathname)) {
    return <></>;
  }

  return (
    <header style={containerStyle}>
      <div style={bgStyle} />
      <Flex
        justify="space-between"
        wrap="wrap"
        gap={20}
        style={innerStyle}
      >
        <Image
          preview={false}
          src="/logo.svg"
        />
        <Flex
          align="center"
          gap={20}
        >
          <Badge
            color="var(--secondary)"
            count={products.length}
          >
            <Image
              src="/cart.svg"
              preview={false}
            />
          </Badge>
          <Button
            onClick={logOut}
            type="primary"
          >
            Выйти
          </Button>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
