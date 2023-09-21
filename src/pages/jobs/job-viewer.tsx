import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {BsShareFill} from 'react-icons/bs';

export default function JobViewer() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <BreadCrumbComponent className="my-8" />
          <div className="flex flex-row">
            <SearchBar showFilter />
            <Button variant="none" className="ml-4 h-12 px-6 text-white bg-redDefault">
              Pesquisar
            </Button>
          </div>
          <div className="flex flex-row mt-8">
            <div className="w-full flex flex-row justify-between">
              <div className="bg-lightgray1 w-full">
                <div className="ml-7">
                  <div className="flex flex-row w-full justify-between">
                    <p className="pt-7 text-lg">Desenvolver Front-End</p>
                    <div className="flex flex-row justify-between mt-7">
                      <Badge variant="default" className="mr-4">
                        Estágio
                      </Badge>
                      <Badge variant="default" className="mr-7">
                        Remoto
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs">Lorem Ipsum S/A</p>
                  <div className="mt-8 mb-7 flex flex-row justify-between">
                    <p className="font-semibold flex flex-row items-center">
                      R$ 2200 <p className="text-xs font-normal">/Mensal</p>
                    </p>
                    <div className="mb-7">
                      <Button variant="none" className="h-8 rounded-md bg-white mr-7">
                        <BsShareFill size="14" color="#BDBDBD" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <Button
                  variant="none"
                  className="h-10 px-2 text-sm text-black bg-white border-[1.5px] border-lightgray1">
                  Relatar um problema
                </Button>
                <Button variant="none" className="h-10 px-6 ml-4 text-sm text-white bg-redDefault">
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
