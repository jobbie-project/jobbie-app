import Lottie from 'lottie-react';
import AnimationVerified from '../../assets/verified.json';
import {Logoblack} from '@/icons/logo-black';
import {ButtonHover} from '@/components/button-hover-animation';
import {useState} from 'react';

export default function VerifiedEmail() {
  const [showButton, setShowButton] = useState(false);
  setTimeout(() => setShowButton(true), 3500);
  return (
    <>
      <div className="w-full flex flex-row mt-16 justify-center">
        <div className=" flex flex-row items-center justify-between mt-20">
          <Logoblack width={'100'} height={'50'} />
        </div>
      </div>
      <div className="items-center p-5 flex flex-col min-h-screen">
        <div className="max-w-xs w-full">
          <p className="text-black font-semibold text-xl mt-4">Sua conta foi verificada.</p>
          <p className="mt-6 text-sm flex">Parabéns! continue para completar seu perfil.</p>
          <div className="flex justify-center">
            <Lottie
              animationData={AnimationVerified}
              autoPlay={true}
              loop={false}
              style={{height: 180, width: 180, margin: 25}}
            />
          </div>
          <div className="flex justify-center">
            {' '}
            {showButton && (
              <ButtonHover
                text={'Continuar'}
                link={'/registro/estudante/passo-1'}
                type={'button'}
                className="font-semibold text-lg"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}