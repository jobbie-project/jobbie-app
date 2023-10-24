import RegisterHeader from '@/components/register-header';
import Lottie from 'lottie-react';
import AnimationEmail from '../../assets/sent-email.json';
import {toast} from 'react-toastify';
import {useState} from 'react';
import {Countdown} from '@/components/countdown';
import {toastError} from '@/utils/toast-error';

export default function EmailVerification() {
  const [showResend, setShowButton] = useState(false);
  const [wasResended, setWasResended] = useState(false);

  setTimeout(() => setShowButton(true), 2000);

  const handleResend = () => {
    toast.success('O email de verificação foi reenviado.');
    setWasResended(true);
  };

  const handleResendOnCountdown = () => {
    toastError('Espere o tempo terminar para solicitar outro código');
  };

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col mt-6">
        <div className="max-w-md w-full">
          <p className="text-black font-semibold text-lg">Verifique seu email para continuar</p>
          <p className="mt-6 text-sm">Um link de confirmação foi enviado para o seu endereço de email.</p>
          <div className="mt-8 flex justify-center">
            <Lottie animationData={AnimationEmail} autoPlay={true} style={{height: 140, width: 140}} />
          </div>{' '}
          {showResend && (
            <div className="flex flex-col items-center">
              <div className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
                Não recebeu o email?
                <div
                  className={`mx-1 text-black cursor-pointer font-semibold ${wasResended && 'cursor-wait text-gray3'}`}
                  onClick={wasResended ? handleResendOnCountdown : handleResend}>
                  Reenviar
                </div>
              </div>
              {wasResended && <Countdown time={100} callback={() => setWasResended(false)} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
