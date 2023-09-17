import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import TableList from '@/components/table';

export default function JobManagement() {
  return (
    <>
      <Header />
      <div className="max-w w-full flex justify-center">
        <div className="max-w-3xl py-6">
          <div className="w-full">
            <div className="font-semibold m-4">Gerenciamento de Vagas</div>
            <SearchBar className="mb-4" placeholder="Código da vaga, nome da empresa" />
            <TableList />
          </div>
        </div>
      </div>
    </>
  );
}
