import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {BiSolidShareAlt} from 'react-icons/bi';
import LocationIcon from '@/icons/location';
import {CategoryIcon} from '@/icons/category';

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
              <div className="w-full">
                <div className="w-full rounded-md px-7 bg-lightgray1">
                  <div className="flex flex-row w-full justify-between">
                    <p className="pt-7 text-lg font-semibold">Desenvolvedor Front-End</p>
                    <div className="flex flex-row justify-between mt-7">
                      <Badge variant="default" className="mr-4">
                        Estágio
                      </Badge>
                      <Badge variant="default">Remoto</Badge>
                    </div>
                  </div>
                  <p className="text-xs">Lorem Ipsum S/A</p>
                  <div className="mt-8 mb-7 pb-7 flex flex-row justify-between">
                    <div className="font-semibold flex flex-row items-end">
                      R$ 2200 <div className="text-xs font-normal flex items-end mb-[2px]">/Mensal</div>
                    </div>
                    <Button variant="none" className="h-8 p-2 rounded-md bg-white flex flex-row items-center">
                      <BiSolidShareAlt size="24" color="#BDBDBD" />
                    </Button>
                  </div>
                </div>
                <div className="p-10 flex flex-row justify-between">
                  <div className="flex flex-col items-center">
                    <LocationIcon width="52" height="52" />
                    <p className="text-xs text-lightblack2 my-2">Local</p>
                    <div className="text-black font-semibold text-sm">Presencial</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <CategoryIcon width="52" height="52" />
                    <p className="text-xs text-lightblack2 my-2">Categoria</p>
                    <div className="text-black font-semibold text-sm">Estágio</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-6">
                <div className="flex flex-row ">
                  <Button
                    variant="none"
                    className="h-10 px-4 text-sm text-lightblack2 bg-white border-[1.5px] border-lightgray1 whitespace-nowrap	">
                    Relatar um problema
                  </Button>
                  <Button variant="none" className="h-10 px-6 ml-4 text-sm text-white bg-redDefault">
                    Aplicar
                  </Button>
                </div>
                <div className="flex flex-col mt-8 border-2 border-lightgray1 rounded-md p-6">
                  <div className="text-xs text-lightblack2">
                    Responsável:<p className="font-semibold text-sm text-black">Lorem</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Número de Vagas:<p className="font-semibold text-sm text-black">4</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Modalidade:<p className="font-semibold text-sm text-black">Presencial</p>
                  </div>
                  <span className="mt-6 bg-lightgray1 w-full h-1"></span>
                  <div className="text-xs text-lightblack2 mt-6">
                    Local de Trabalho:
                    <p className="font-semibold text-sm text-black">Rua Lorem Ipsum, 69 Dolor - SIT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
