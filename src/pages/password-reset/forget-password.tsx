import RegisterHeader from '@/components/register-header';
import Lottie from 'lottie-react';
import Padlock from '@/assets/padlock.json';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import GeneralInput from '@/components/general-input';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
    try {
      if (!EmailValidator.validate(email)) throw new Error('Insira um email válido');
      navigate('/recuperacao-de-conta/verificacao-de-email');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-sm w-full">
          <p className="text-black font-semibold text-xl mt-20">Esqueceu sua senha?</p>
          <p className="mt-6 text-sm">Digite seu email para receber instruções sobre a redefinição de senha.</p>
          <div className="mt-8 flex justify-center">
            <Lottie animationData={Padlock} autoPlay={true} style={{height: 140, width: 140}} />
          </div>
          <div className="mt-4 mx-auto max-w-lg">
            <GeneralInput callback={e => setEmail(e)} label="Email" />
          </div>
          <GeneralButton text={'Continuar'} type={'submit'} callback={onSubmit} className="mt-4" />
          <span className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
            Lembrou sua senha?
            <Link className="ml-1 text-black font-semibold" to="/entrar">
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
