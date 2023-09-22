import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {BiSolidShareAlt} from 'react-icons/bi';
import LocationIcon from '@/icons/location';
import {CategoryIcon} from '@/icons/category';
import {SalaryIcon} from '@/icons/salary';

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
                      <BiSolidShareAlt size="24" color="#7C7979" />
                    </Button>
                  </div>
                </div>
                <div className="py-6 px-16 flex flex-row justify-between">
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
                  <div className="flex flex-col items-center">
                    <SalaryIcon width="52" height="52" />
                    <p className="text-xs text-lightblack2 my-2">Salário</p>
                    <div className="text-black font-semibold text-sm">R$ 2200</div>
                  </div>
                </div>
                <div className="flex flex-col px-7 mt-6">
                  <span className="bg-lightgray1 rounded-md w-full h-1"></span>
                  <span className="text-sm mt-6 flex flex-row text-black">
                    Anunciado em: <p className="ml-1">11 de Agosto</p>
                  </span>
                  <p className="font-semibold mt-6">Descrição da vaga</p>
                  <div className="mt-6 text-sm text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et elit ultricies, auctor diam id,
                    suscipit diam. Integer nunc erat, placerat sed suscipit vitae, placerat sed sapien. Vivamus interdum
                    sem mi, ac fringilla ipsum tempus eget. Nulla euismod ac tortor sit amet aliquam. Donec mauris arcu,
                    dictum vitae imperdiet vitae, sodales in massa. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Phasellus et justo consectetur, facilisis enim vel, dictum est. Mauris dapibus ante at augue
                    commodo, a rhoncus arcu fringilla. Praesent quam risus, egestas a commodo at, maximus vitae justo.
                    Nunc fringilla nibh ac fermentum tempus. Pellentesque a porttitor felis. Phasellus vitae ligula
                    sapien. Fusce dictum nisl enim, vitae malesuada ipsum pellentesque ut. Donec eu porta sem. Morbi
                    fermentum semper justo a finibus. Fusce ut faucibus tellus. Fusce dapibus dignissim lectus, eu
                    viverra dolor porta sit amet. Etiam sed sem sit amet massa dignissim efficitur. Nam commodo sapien
                    ac massa congue, vitae posuere nibh iaculis. Maecenas consequat velit vel arcu imperdiet aliquet.
                    Phasellus at diam velit. Nullam eget erat cursus ipsum lacinia tristique. Morbi hendrerit justo ut
                    ex viverra sollicitudin. Praesent congue mauris purus, a luctus libero finibus vitae. Nullam
                    hendrerit justo eget sem eleifend, consequat efficitur est tincidunt.
                  </div>
                  <span className="bg-lightgray1 mt-6 rounded-md w-full h-1"></span>
                  <div className="mb-20">
                    <p className="mt-6 font-semibold text-sm">
                      Por favor, verifique os requisitos acima antes de se candidatar a uma vaga
                      <span className="text-redDefault font-bold">*</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-6">
                <div className="flex flex-row ">
                  <Button
                    variant="none"
                    className="h-10 px-4 text-sm text-lightblack2 bg-white border-2 border-lightgray1 whitespace-nowrap	">
                    Relatar um problema
                  </Button>
                  <Button variant="none" className="h-10 px-6 ml-4 text-sm text-white bg-redDefault">
                    Aplicar
                  </Button>
                </div>
                <div className="flex flex-col mt-8 border-2 border-lightgray1 rounded-md p-6">
                  <span className="text-xs mb-6 flex flex-row font-semibold text-black">
                    Anunciado em: <p className="ml-1">11 de Agosto</p>
                  </span>
                  <div className="text-xs text-lightblack2">
                    Responsável:<p className="font-semibold text-sm text-black">Lorem</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Número de Vagas:<p className="font-semibold text-sm text-black">4</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Categoria:<p className="font-semibold text-sm text-black">Estágio</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Jornada de Trabalho:<p className="font-semibold text-sm text-black">Meio Período</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Salário:<p className="font-semibold text-sm text-black">R$ 2200</p>
                  </div>
                  <div className="text-xs text-lightblack2 mt-6">
                    Modalidade:<p className="font-semibold text-sm text-black">Presencial</p>
                  </div>
                  <span className="mt-6 bg-lightgray1 rounded-md w-full h-1"></span>
                  <div className="text-xs mt-6">
                    Local de Trabalho:
                    <p className="text-sm font-semibold text-black">Rua Lorem Ipsum, 69 Dolor - SIT</p>
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
