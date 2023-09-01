import {Logoblack} from '@/icons/logo-black';
import PasswordInput from '@/components/password';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import * as EmailValidator from 'email-validator';
import GeneralInput from '@/components/general-input';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import {red} from '@mui/material/colors';

const Theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
  },
});

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.email) throw new Error('Insira seu email.');
      if (!EmailValidator.validate(data.email)) throw new Error('Insira um email válido');
      if (!data.password) throw new Error('Insira sua senha.');
      navigate('/inicio');
    } catch (error) {
      toastError(error);
    }
  };

  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <div className="max-h-[100vh] container flex justify-center max-w-full mx-auto py-24 px-6 font-sans">
        <div className="max-w-sm mx-auto px-6 relative flex flex-wrap mt-6">
          <div className="mt-6">
            <div className="mb-5 flex justify-center">
              <Logoblack width={'100'} height={'50'} />
            </div>
            <div className="text-center font-regular select-none text-black">Continue com sua conta Jobbie.</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 mx-auto max-w-lg">
                <GeneralInput register={register} registerName="email" label="Email" />
                <div className="py-2">
                  <PasswordInput register={register} text="Senha" registerName="password" />
                </div>

                <div className="flex justify-between mt-6">
                  <label className="block text-gray-500 font-regular my-2">
                    <div className="flex flex-row items-center ml-[-10px]">
                      <ThemeProvider theme={Theme}>
                        <Checkbox defaultChecked />
                      </ThemeProvider>
                      <span>Lembrar de mim</span>
                    </div>
                  </label>
                  <label className="block text-gray-500 font-semibold my-2">
                    <span className="cursor-pointer tracking-tighter text-black font-semibold ">
                      <a href={'/recuperacao-de-conta'}>Esqueceu sua senha?</a>
                    </span>
                  </label>
                </div>
                <div>
                  <GeneralButton text={'Entrar'} type={'submit'} />
                  <span className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
                    Não possui conta?
                    <Link className="ml-1 text-black font-semibold" to="/registro">
                      Cadastre-se
                    </Link>
                  </span>
                </div>
              </div>
            </form>

            <div className="text-sm text-warmGray-400 font-normal flex flex-row mt-8 justify-center text-center">
              <span>
                Ao continuar você concorda que declara que leu e concorda com os{' '}
                <a className="text-black font-semibold inline-block" href="">
                  Termos de Uso
                </a>{' '}
                e a{' '}
                <a className="text-black font-semibold inline-block" href="">
                  Politica de Privacidade.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
