import { Button, Form as AntdForm, Input, Typography, Flex } from 'antd';
import { IApiResponse, authApi } from '../../../api/auth';
import { useContext, useMemo, useRef, useState } from 'react';
import { Id, TypeOptions, toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { authContext } from '../../../providers/auth';
import Tutorial from '../../../ui/tutorial';
import './index.scss';

const { Link } = Typography;

type FieldType = typeof initialValues;

const initialValues = {
  login: '',
  password: '',
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  padding: '0 20px',
};

const updateToast = (id: Id, type: TypeOptions, content?: string) => {
  toast.update(id, {
    type,
    render: content || 'Что-то пошло не так',
    isLoading: false,
    autoClose: 5000,
  });
};

const Form: React.FC = () => {
  const loginRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);
  const { setAuth } = useContext(authContext);

  const onFinish = async (values: FieldType) => {
    setIsPending(true);
    const toastId = toast.loading('Загрузка...');

    try {
      const response = await authApi.login({
        ...values,
        login: values.login.replace(/ |\(|\)|-/g, ''),
      });

      if (response.type !== 'success') {
        //непредвиденная ситуция
        updateToast(toastId, 'error', response.content);
      }

      toast.dismiss(toastId);
      setAuth(true);
    } catch (err: IApiResponse | unknown) {
      const apiResponseGuardian = (
        item: IApiResponse | unknown
      ): item is IApiResponse => {
        return (item as IApiResponse).type !== undefined;
      };

      const error = apiResponseGuardian(err)
        ? err.content
        : 'Что-то пошло не так...'; //на случай, если ошибка пришла не от authApi

      updateToast(toastId, 'error', error);
    } finally {
      setIsPending(false);
    }
  };

  const tutorialMap = useMemo(() => {
    return [
      {
        ref: loginRef,
        message:
          'Введите номер телефона в формате 9XXXXXXXXX. Данные для авторизации - 9522222222, admin',
        textClassName: 'login-form__login-tutorial-text',
      },
      {
        ref: registerRef,
        message: 'Для регистрации нового агентства нажмите сюда',
      },
    ];
  }, []);

  return (
    <>
      <Tutorial.container map={tutorialMap} />
      <AntdForm
        name="basic"
        layout="vertical"
        style={containerStyle}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Tutorial.wrapper innerRef={loginRef}>
          <AntdForm.Item<FieldType>
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Укажите логин' }]}
          >
            <InputMask
              mask="+7 (999) 999-99-99"
              placeholder="+7 ___ __-__-__"
              alwaysShowMask
              className="login-form__input"
            >
              <Input type="tel" />
            </InputMask>
          </AntdForm.Item>
        </Tutorial.wrapper>

        <AntdForm.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Укажите пароль' },
            { max: 40, message: 'Слишком длинный пароль' },
            { min: 5, message: 'Пароль должен быть больше 5 символов' },
          ]}
        >
          <Input.Password
            className="login-form__input"
            placeholder="Введите значение"
          />
        </AntdForm.Item>
        <AntdForm.Item style={{ marginBottom: 0 }}>
          <Button
            disabled={isPending}
            type="primary"
            htmlType="submit"
            style={{ width: '100%', padding: '10px 20px', height: 'auto' }}
          >
            Войти
          </Button>
        </AntdForm.Item>
        <Flex
          vertical
          align="center"
        >
          <Tutorial.wrapper innerRef={registerRef}>
            <Link href="/register">
              <Button
                size="large"
                type="link"
                style={{ fontSize: 13, fontWeight: 500 }}
              >
                Регистация агентства
              </Button>
            </Link>
          </Tutorial.wrapper>
          <Link href="/reset-password">
            <Button
              size="large"
              type="link"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              Забыли пароль?
            </Button>
          </Link>
        </Flex>
      </AntdForm>
    </>
  );
};

export default Form;
