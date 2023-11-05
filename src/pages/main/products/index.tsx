import { Row, Typography } from 'antd';
import Product, { ProductType } from './product';
import { useContext, useState } from 'react';
import { cartContext } from '../../../providers/cart';

const { Text, Title } = Typography;

const data = [
  {
    name: 'Товар 1',
    price: 200,
    id: 0,
  },
  {
    name: 'Товар 2',
    price: 200,
    id: 1,
  },
  {
    name: 'Товар 3',
    price: 200,
    id: 2,
  },
  {
    name: 'Товар 4',
    price: 200,
    id: 3,
  },
  {
    name: 'Товар 5',
    price: 200,
    id: 4,
  },
  {
    name: 'Товар 6',
    price: 200,
    id: 5,
  },
  {
    name: 'Товар 7',
    price: 200,
    id: 6,
  },
  {
    name: 'Товар 8',
    price: 200,
    id: 7,
  },
];

const titileStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 10,
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>(data);
  const { deleteProduct } = useContext(cartContext);

  const onDelete = (id: number) => {
    deleteProduct(id);
    setProducts((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <section>
      <Title style={titileStyle}>
        Товары
        <Text>({products.length} штук)</Text>
      </Title>
      {products.length === 0 ? <p>Ничего не найдено</p> : null}
      <Row gutter={[16, 16]}>
        {products.map((i) => (
          <Product
            {...i}
            onDelete={() => onDelete(i.id)}
            key={i.id}
          />
        ))}
      </Row>
    </section>
  );
};

export default Products;
