import { Flex, Image, Typography } from 'antd';
import Form from './form';

const { Text, Link } = Typography;

const mainStyle: React.CSSProperties = {
  rowGap: 20,
  justifyContent: 'center',
};
const containerStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '64px 0 14px',
  maxWidth: 600,
  width: '100%',
  margin: '0 auto',
  borderRadius: 4
};
const logoContainerStyle: React.CSSProperties = {
  marginBottom: 32,
};
const innerStyle: React.CSSProperties = {
  maxWidth: 360,
  width: '100%',
  margin: '0 auto',
};

const LoginPage: React.FC = () => {
  return (
    <main style={mainStyle}>
      <Flex style={containerStyle}>
        <Flex
          vertical
          align="center"
          style={innerStyle}
        >
          <Flex style={logoContainerStyle}>
            <Image
              width="fit-content"
              src="/logo.svg"
              preview={false}
              alt="Логотип"
            />
          </Flex>
          <Form />
        </Flex>
      </Flex>
      <Flex
        vertical
        align="center"
      >
        <Text style={{ color: 'var(--secondary)', fontSize: 15 }}>
          Есть вопросы? Напишите нам по адресу
        </Text>
        <Link
          style={{ fontSize: 15 }}
          href="mailto:emis@cds.spb.ru"
        >
          emis@cds.spb.ru
        </Link>
      </Flex>
    </main>
  );
};

export default LoginPage;
