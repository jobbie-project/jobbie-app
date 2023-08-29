import RegisterHeader from '@/components/register-header';
import {useNavigate} from 'react-router-dom';
import Lottie from 'lottie-react';
import AnimationEmail from '../../../assets/animation_email.json';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/');
  };

  return (
    <div>
      <RegisterHeader />
      <form onSubmit={onSubmit}>
        <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-xl mt-20">Verifique sua conta para continuar</p>
            <p className="mt-6 text-sm">Um link de ativação foi enviado para o endereço de email que você forneceu.</p>
            <Lottie
              animationData={AnimationEmail}
              autoPlay={true}
              style={{height: 100, width: 100, justifySelf: 'center'}}
            />
            ;
          </div>
        </div>
      </form>
    </div>
  );
}
