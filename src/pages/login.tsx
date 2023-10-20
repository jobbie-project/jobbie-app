import {Logoblack} from '@/icons/logo-black';
import PasswordInput from '@/components/password';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import * as EmailValidator from 'email-validator';
import GeneralInput from '@/components/general-input';
import {Checkbox} from '@/components/ui/checkbox';
import Api from '@/services/api/api.service';
import authenticationService from '@/services/authentication/authentication.service';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    try {
      if (!formData.email) throw new Error('Insira seu email.');
      if (!EmailValidator.validate(formData.email)) throw new Error('Insira um email válido');
      if (!formData.password) throw new Error('Insira sua senha.');
      const {data} = await Api.post('/auth/authenticate', {username: formData.email, password: formData.password});
      authenticationService.authenticate(data.id, data.access_token, data.name, data.role, data.profile_completed);
      authenticationService.handleRedirect(data, navigate);
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
      <div className="h-screen">
        <div className="max-w-full h-full flex flex-col p-5 justify-center items-center">
          <div className="max-w-md w-full">
            <div className="flex justify-center">
              <Logoblack width={'100'} height={'50'} />
            </div>
            <p className="text-black font-regular text-base select-none mt-8 flex justify-center ">
              Continue com sua conta Jobbie.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10">
                <GeneralInput register={register} registerName="email" label="Email" />
                <PasswordInput register={register} text="Senha" registerName="password" className="mt-4" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember" className="mb-1" />
                  <label htmlFor="remember" className="text-sm leading-none peer-disabled:cursor-not-allowed ml-2">
                    Lembrar de mim
                  </label>
                </div>
                <div
                  onClick={() => navigate('/recuperacao-de-conta')}
                  className="cursor-pointer text-sm text-black font-semibold">
                  Esqueceu sua senha?
                </div>
              </div>
              <GeneralButton text={'Entrar'} type={'submit'} />
              <div className="text-sm text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
                Não possui conta? &nbsp;
                <Link className="text-sm text-black font-semibold" to="/registro">
                  Cadastre-se
                </Link>
              </div>
            </form>
            <div className="text-xs text-warmGray-400 font-normal flex flex-row mt-8 justify-center text-center">
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
