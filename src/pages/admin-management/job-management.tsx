import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import TableList from '@/components/table';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

export default function JobManagement() {
  const navigate = useNavigate();

  const sendTo = () => {
    navigate('/nova-vaga/passo-1');
  };

  return (
    <>
      <Header />
      <div className="max-w w-full flex justify-center">
        <div className="max-w-3xl py-6">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div className="font-semibold m-4">Gerenciamento de Vagas</div>
              <Button onClick={sendTo} className="bg-redDefault text-white hover:bg-lightgray1 hover:text-black">
                Publicar nova vaga
              </Button>
            </div>
            <SearchBar className="mb-4" placeholder="Código da vaga, nome da empresa" />
            <TableList />
          </div>
        </div>
      </div>
    </>
  );
}
