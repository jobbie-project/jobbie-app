import RegisterHeader from '@/components/register-header';
import Lottie from 'lottie-react';
import AnimationEmail from '../../assets/email_lottie.json';

export default function VerifyEmail() {
  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-xs w-full">
          <p className="text-black font-semibold text-xl mt-20">Verifique sua conta para continuar</p>
          <p className="mt-6 text-sm">Um link de ativação foi enviado para o endereço de email que você forneceu.</p>
          <div className="mt-8 flex justify-center">
            <Lottie animationData={AnimationEmail} autoPlay={true} style={{height: 140, width: 140}} />
          </div>
        </div>
      </div>
    </>
  );
}
