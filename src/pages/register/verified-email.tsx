import Lottie from 'lottie-react';
import AnimationVerified from '../../assets/verified.json';
import {Logoblack} from '@/icons/logo-black';
import {ButtonHover} from '@/components/button-hover-animation';
import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import {toast} from 'react-toastify';

export default function VerifiedEmail() {
  const [showButton, setShowButton] = useState(false);
  setTimeout(() => setShowButton(true), 3500);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const token = params.get('token');
      if (!token) {
        navigate('/entrar');
        return;
      }
      await Api.post('/auth/verify-email', {token});
      toast.success('Email verificado com sucesso!');
    } catch (error) {
      toastError('Ocorreu um erro ao verificar seu email.');
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  const onClick = () => {
    navigate('/entrar');
  };

  return (
    <>
      <div className="w-full flex flex-row mt-16 justify-center">
        <div className=" flex flex-row items-center justify-between mt-20">
          <Logoblack width={'100'} height={'50'} />
        </div>
      </div>
      <div className="items-center p-5 flex flex-col">
        <div className="max-w-md w-full">
          <p className="text-black font-semibold text-lg mt-10">Sua conta foi verificada.</p>
          <p className="mt-6 text-sm flex">Parabéns! continue para completar seu perfil.</p>
          <div className="flex justify-center">
            <Lottie
              animationData={AnimationVerified}
              autoPlay={true}
              loop={false}
              style={{height: 180, width: 180, margin: 25}}
            />
          </div>
          <div onClick={onClick} className="flex justify-center">
            {' '}
            {showButton && <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-md" />}
          </div>
        </div>
      </div>
    </>
  );
}
