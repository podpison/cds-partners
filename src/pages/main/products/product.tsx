import { Button, Col, Flex, Image, Typography } from 'antd';
import { useContext, useMemo } from 'react';
import { cartContext } from '../../../providers/cart';

const { Text, Title } = Typography;

export type ProductType = {
  img?: string;
  name: string;
  price: number;
  id: number;
};

interface Props extends ProductType {
  onDelete: () => void;
}

const containerStyle: React.CSSProperties = {
  background: 'white',
  padding: 10,
  borderRadius: 4,
};

const Product: React.FC<Props> = ({ name, price, img, id, onDelete }) => {
  const { products, addProduct, deleteProduct } = useContext(cartContext);

  const isInCart = useMemo(() => {
    return products.some((p) => p.id === id);
  }, [id, products]);

  const handleCart = () => {
    if (isInCart) {
      deleteProduct(id);
    } else {
      addProduct({ name, price, img, id });
    }
  };

  return (
    <Col xs={24} sm={12} md={8}>
      <Flex
        vertical
        style={containerStyle}
        gap={10}
      >
        <Flex
          align="center"
          gap={20}
        >
          <Title
            level={2}
            style={{ margin: 0 }}
          >
            {name}
          </Title>
        </Flex>
        <div>
          <Image
            src={
              img ||
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          />
        </div>
        <Text>{price} рублей</Text>
        <Flex
          gap={10}
          wrap="wrap"
        >
          <Button
            onClick={handleCart}
            type="primary"
          >
            {isInCart ? 'Удалить из корзины' : 'Добавить в корзину'}
          </Button>
          <Button
            type="primary"
            danger
            onClick={onDelete}
          >
            Удалить
          </Button>
        </Flex>
      </Flex>
    </Col>
  );
};

export default Product;
