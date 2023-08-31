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
      if (!validate(data.email)) throw new Error('Utilize um email institucional da Fatec');
      if (!isPasswordValid) throw new Error('Senha muito fraca');
      navigate('/verifica-email');
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
            <input
              {...register('name')}
              required
              placeholder="Nome"
              type="string"
              className="text-sm block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
            />
            <div className="mt-4 w-full">
              <input
                {...register('email')}
                required
                placeholder="Email Institucional"
                type="email"
                className="text-sm block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray1 focus:outline-none bg-white"
              />
            </div>
            <div className="py-2 w-full">
              <PasswordInput register={register} registerName="password" />
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
