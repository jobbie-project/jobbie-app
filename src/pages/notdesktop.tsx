import {Header} from '@/components/header';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import Lottie from 'lottie-react';
import AnimationVerified from '@/assets/notdesktop.json';
import {toast} from 'react-toastify';

export default function NotDesktop() {
  const navigate = useNavigate();
  toast.error('Se já estiver em uma sessão desktop, tente reduzir o zoom da página pelo navegador.');

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="h-full flex flex-col items-center">
        <div className="flex flex-col my-auto">
          <div className="font-semibold text-2xl flex flex-col justify-center items-center">
            <p className="mb-2">Ops!</p>
            <p className="text-lg">No momento, essa página só esta dispónível para desktop.</p>
          </div>
          <div className="flex justify-center">
            <Lottie animationData={AnimationVerified} autoPlay={true} loop={true} style={{height: 260, width: 260}} />
          </div>
          <p className="text-sm">Se já estiver em uma sessão desktop, tente reduzir o zoom da página pelo navegador.</p>
          <div className="mt-10 flex justify-center items-center">
            <Button
              onClick={() => navigate('/inicio')}
              variant="none"
              className="rounded-md bg-primaryGray text-white font-semibold flex flex-row items-center">
              Retornar à pagina inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
