import RegisterHeader from '@/components/register-header';
import Lottie from 'lottie-react';
import AnimationEmail from '../../assets/sent-email.json';
import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';
import {Countdown} from '@/components/countdown';
import {toastError} from '@/utils/toast-error';
import {useSearchParams} from 'react-router-dom';
import Api from '@/services/api/api.service';

export default function EmailVerification() {
  const [showResend, setShowButton] = useState(false);
  const [wasResended, setWasResended] = useState(false);
  const [params] = useSearchParams();
  const [email, _] = useState(params.get('email'));

  setTimeout(() => setShowButton(true), 2000);

  const handleResend = async () => {
    try {
      await Api.post('/auth/forgot-password', {email});
      toast.success('O email de verificação foi reenviado.');
      setWasResended(true);
    } catch (error) {
      toastError(error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const email = params.get('email');
      await Api.post('/auth/forgot-password', {email});
      toast.success('O email de verificação foi enviado.');
      setWasResended(true);
    } catch (error) {
      toastError(error);
    }
  };

  const handleResendOnCountdown = () => {
    toastError('Espere o tempo terminar para solicitar outro código');
  };

  useEffect(() => {
    try {
      handleSendEmail();
    } catch (error) {
      toastError(error);
    }
  }, []);

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col">
        <div className="max-w-md w-full">
          <p className="text-black font-semibold text-lg mt-10">Verifique seu email para continuar</p>
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
