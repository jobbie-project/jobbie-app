import {Logoblack} from '@/icons/logo-black';
import PasswordInput from '@/components/password';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import * as EmailValidator from 'email-validator';

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
      <div className="max-h-[100vh] container max-w-full mx-auto py-24 px-6 font-sans">
        <div className="max-w-sm mx-auto px-6 relative flex flex-wrap mt-6">
          <div className="mt-6">
            <div className="mb-5 flex justify-center">
              <Logoblack width={'100'} height={'50'} />
            </div>
            <div className="text-center font-regular select-none text-black">Continue com sua conta Jobbie.</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8 mx-auto max-w-lg">
                <div className="py-2 relative">
                  <input
                    {...register('email')}
                    placeholder=""
                    type="text"
                    className="peer h-10 border-b-2 w-[336px] border-gray-300 text-gray-900 focus:outline-none focus:border-red"
                  />
                  <label
                    htmlFor="email"
                    className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email
                  </label>
                </div>
                <div className="py-2">
                  <PasswordInput register={register} text="Senha" registerName="password" />
                </div>

                <div className="flex justify-between mt-6">
                  <label className="block text-gray-500 font-regular my-2">
                    <input
                      type="checkbox"
                      className="accent-red peer relative left-0 h-4 w-4 shrink-0  rounded-sm border outline-none align-middle"
                    />
                    <span className="py-2 px-1 text-sm text-gray-600 leading-snug align-middle select-none">
                      {' '}
                      Lembrar de mim{' '}
                    </span>
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
