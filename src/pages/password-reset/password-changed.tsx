import Lottie from 'lottie-react';
import AnimationVerified from '../../assets/verified.json';
import {Logoblack} from '@/icons/logo-black';
import {ButtonHover} from '@/components/button-hover-animation';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function PasswordChanged() {
  const [showButton, setShowButton] = useState(false);
  setTimeout(() => setShowButton(true), 3500);

  const navigate = useNavigate();

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
      <div className="items-center p-5 flex flex-col ">
        <div className="max-w-sm w-full">
          <p className="text-black font-semibold text-xl mt-4">Sua senha foi alterada.</p>
          <p className="mt-6 text-sm flex">Sua conta foi recuperada e você já pode entrar.</p>
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
            {showButton && <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-lg" />}
          </div>
        </div>
      </div>
    </>
  );
}
