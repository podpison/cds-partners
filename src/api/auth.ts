const defaultUser = {
  login: '+79522222222',
  password: 'admin',
};

export interface IApiResponse {
  type: 'success' | 'error';
  content?: string;
}

type LoginParams = {
  login: string;
  password: string;
};

export const authApi = {
  login: async (values: LoginParams): Promise<IApiResponse> => {
    return new Promise((res, rej) => {
      console.log(values)
      setTimeout(() => {
        //setTimeout для иммитации задержки
        if (
          values.login !== defaultUser.login ||
          values.password !== defaultUser.password
        ) {
          rej({
            type: 'error',
            content: 'Неправильный логин или пароль',
          });
        }

        res({
          type: 'success',
        });
      }, 1000);
    });
  },
};
