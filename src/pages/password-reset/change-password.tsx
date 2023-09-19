import {GeneralButton} from '@/components/general-button';
import PasswordInput from '@/components/password';
import PasswordStrengthMeter from '@/components/password-strength-meter';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

interface FormData {
  passwordMatch: string;
  password: string;
}

export default function ChangePassword() {
  const {register, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      passwordMatch: '',
      password: '',
    },
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    try {
      if (data.password !== data.passwordMatch) throw new Error('As senhas não coincidem. Tente novamente.');
      if (!isPasswordValid) throw new Error('Senha muito fraca');
      navigate('/recuperacao-de-conta/senha-alterada');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col  mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg mt-20 select-none">Redefinição de senha</p>
            <p className="mt-6">Crie uma nova senha para realizar login no portal.</p>
          </div>
          <div className="py-2 w-full">
            <PasswordInput register={register} registerName="password" text="Digite a nova senha" className="mt-2" />
            <PasswordStrengthMeter
              password={watch('password')}
              onChange={(isValid: boolean) => isValid !== isPasswordValid && setIsPasswordValid(isValid)}
            />
            <div className="mt-6 text-xs text-gray3">
              Senhas devem ter pelo menos: 6 caracteres com combinações de letras e números.
            </div>
            <PasswordInput register={register} registerName="passwordMatch" text="Digite novamente" className="mt-4" />
          </div>
          <div className="mt-2">
            <GeneralButton text={'Continuar'} type={'submit'} />
          </div>
        </form>
      </div>
    </div>
  );
}
