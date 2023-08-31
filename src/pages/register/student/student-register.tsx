import {GeneralButton} from '@/components/general-button';
import PasswordInput from '@/components/password';
import PasswordStrengthMeter from '@/components/password-strength-meter';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function StudentRegister() {
  const {register, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  const validate = (email: string) => {
    return email.split('@')[1] === 'fatec.sp.gov.br' ? true : false;
  };

  const onSubmit = (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira um nome válido');
      if (!validate(data.email)) throw new Error('Utilize um email institucional da Fatec');
      if (!isPasswordValid) throw new Error('Senha muito fraca');
      navigate('/verificacao-de-email');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl mt-20 select-none">Criar uma conta</p>
            <p className="mt-6">Preencha com as informações que deseja utilizar para realizar login no portal.</p>
          </div>
          <div className="mt-8 w-full">
            <div className="py-2 relative">
              <input
                {...register('name')}
                placeholder=""
                type="text"
                className="peer h-8 border-b-2 w-full border-gray1 text-gray-900 focus:outline-none focus:border-red"
              />
              <label
                htmlFor="name"
                className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Nome completo
              </label>
            </div>
            <div className="mt-4 w-full">
              <div className="py-2 relative">
                <input
                  {...register('email')}
                  placeholder=""
                  type="string"
                  className="peer h-8 border-b-2 w-full border-gray1 text-gray-900 focus:outline-none focus:border-red"
                />
                <label
                  htmlFor="email"
                  className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Email
                </label>
              </div>
            </div>
            <div className="py-2 w-full">
              <PasswordInput text="Senha" register={register} registerName="password" />
              <PasswordStrengthMeter
                password={watch('password')}
                onChange={(isValid: boolean) => isValid !== isPasswordValid && setIsPasswordValid(isValid)}
              />
              <div className="mt-4 text-xs text-gray3">
                Senhas devem ter pelo menos: 6 caracteres com combinações de letras e números.
              </div>
            </div>
          </div>
          <div className="mt-2">
            <GeneralButton text={'Continuar'} type={'submit'} />
          </div>
        </form>
        <span className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
          Já possui conta?
          <Link className="ml-1 text-black font-semibold" to="/entrar">
            Entrar
          </Link>
        </span>
      </div>
    </div>
  );
}
