import {Header} from '@/components/header';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import ChromeDinoGame from 'react-chrome-dino';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-[60vh]">
      <Header />
      <div>
        <div className="font-semibold text-2xl flex justify-center items-center">Página não encontrada.</div>
        <ChromeDinoGame />
        <div className="mt-16 flex justify-center items-center">
          <Button
            onClick={() => navigate('/inicio')}
            variant="none"
            className="rounded-md bg-primaryGray text-white font-semibold flex flex-row items-center">
            Retornar à pagina inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
