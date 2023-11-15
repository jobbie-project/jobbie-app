import Lottie from 'lottie-react';
import AnimationVerified from '@/assets/notdesktop.json';
import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';
import {useWindowSize} from '@/hooks/useWindowSize';

export default function NotDesktop() {
  const [wasShown, setWasShown] = useState(false);
  const {width} = useWindowSize();

  useEffect(() => {
    if (!wasShown) {
      toast.error('Se já estiver em uma sessão desktop, tente reduzir o zoom da página pelo navegador.');
      setWasShown(true);
      setTimeout(() => {
        setWasShown(false);
      }, 2000);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="h-full flex flex-col items-center">
        <div className="flex flex-col my-auto">
          {width <= 500 ? (
            <div className="p-10">
              <div className="font-semibold text-2xl flex flex-col justify-center items-center">
                <p className="mb-2">Ops!</p>
                <p className="text-lg">No momento, essa página só esta disponível para desktop.</p>
              </div>
            </div>
          ) : (
            <div className="font-semibold text-2xl flex flex-col justify-center items-center">
              <p className="mb-2">Ops!</p>
              <p className="text-lg">No momento, essa página só esta disponível para desktop.</p>
            </div>
          )}
          <div className="flex justify-center">
            <Lottie animationData={AnimationVerified} autoPlay={true} loop={true} style={{height: 260, width: 260}} />
          </div>
          {width <= 500 ? (
            <p className="text-sm p-10">
              Se já estiver em uma sessão desktop, tente reduzir o zoom da página pelo navegador.
            </p>
          ) : (
            <p className="text-sm">
              Se já estiver em uma sessão desktop, tente reduzir o zoom da página pelo navegador.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
