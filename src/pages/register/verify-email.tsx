import RegisterHeader from '@/components/register-header';
import Lottie from 'lottie-react';
import AnimationEmail from '../../assets/email_lottie.json';
import {toast} from 'react-toastify';
import {useState} from 'react';

export default function VerifyEmail() {
  const [showResend, setShowButton] = useState(false);
  setTimeout(() => setShowButton(true), 2000);

  const resendEmail = () => {
    toast.success('O email de verificação foi reenviado.');
  };

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-xs w-full">
          <p className="text-black font-semibold text-xl mt-20">Verifique sua conta para continuar</p>
          <p className="mt-6 text-sm">Um link de ativação foi enviado para o endereço de email que você forneceu.</p>
          <div className="mt-8 flex justify-center">
            <Lottie animationData={AnimationEmail} autoPlay={true} style={{height: 140, width: 140}} />
          </div>{' '}
          {showResend && (
            <div className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
              Não recebeu o email?
              <div className="ml-1 text-black cursor-pointer font-semibold" onClick={resendEmail}>
                Reenviar
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
