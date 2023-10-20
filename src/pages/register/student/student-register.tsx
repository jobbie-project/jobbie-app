import {GeneralButton} from '@/components/general-button';
import GeneralInput from '@/components/general-input';
import PasswordInput from '@/components/password';
import PasswordStrengthMeter from '@/components/password-strength-meter';
import RegisterHeader from '@/components/register-header';
import {UserRole} from '@/enums';
import Api from '@/services/api/api.service';
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

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira um nome válido');
      if (!validate(data.email)) throw new Error('Utilize um email institucional da Fatec');
      if (!isPasswordValid) throw new Error('Senha muito fraca');
      await Api.post('/user/create', {...data, role: UserRole.STUDENT});
      navigate('/verificacao-de-email');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col  mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="max-w-md w-full">
            <p className="text-black font-semibold text-lg mt-8 select-none">Criar uma conta</p>
            <p className="mt-6 text-sm">
              Preencha com as informações que deseja utilizar para realizar login no portal.
            </p>
          </div>
          <div className="mt-6 w-full text-sm">
            <GeneralInput register={register} registerName="name" label="Nome completo" />
            <GeneralInput register={register} registerName="email" label="Email Institucional" />
            <div className="py-2 w-full text-sm">
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
        <span className="text-warmGray-400 text-sm flex flex-row mt-8 justify-center">
          Já possui conta?
          <Link className="ml-1 text-black font-semibold" to="/entrar">
            Entrar
          </Link>
        </span>
      </div>
    </div>
  );
}
