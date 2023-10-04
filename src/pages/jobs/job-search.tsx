import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import CardLarge from '@/components/card-large';
import {Job} from '@/interfaces/job';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Checkbox} from '@/components/ui/checkbox';
import {useState} from 'react';

const mockJob: Job = {
  title: 'Desenvolvedor Front-end',
  company: {
    name: 'Lorem ipsum S/A',
    email: 'mockemail@gmail.com',
    phone: '11 99999-9999',
    document: '99.999.999/9999-99',
    sector: 'Tecnologia',
    address: 'Rua Lorem Ipsum, 9999',
  },
  sector: ['Design'],
  category: 'Estágio',
  description: 'Lorem ipsum dolor sit amet, consectetu',
  salary: 1600,
  modalities: 'Remoto',
  daily_hours: 6,
};

const numberOfJobs = 30;

export default function JobViewer() {
  const [showModality, setShowModality] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const jobs = Array(5).fill(mockJob);

  return (
    <div className="w-full select-none">
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
          <div className="w-full flex flex-row mt-8 justify-between">
            <div className="w-full">
              {jobs.map((_, index) => (
                <CardLarge key={index} />
              ))}
              <div className="flex flex-row my-8 justify-center">
                <Stack spacing={2}>
                  <Pagination count={numberOfJobs} shape="rounded" />
                </Stack>
              </div>
            </div>
            <div className="flex flex-col ml-6 w-96">
              <span className="text-xs text-lightblack">60 Resultados</span>
              <div className="flex flex-row justify-between border-2 border-lightgray1 rounded-md p-4 my-6 font-semibold text-sm">
                Filtros <span className="text-xs mt-1 text-primaryGray">Limpar</span>
              </div>
              <div className="mb-6 flex flex-col border-2 border-lightgray1 rounded-md px-4 text-sm">
                <div
                  className="my-6 flex flex-row justify-between font-semibold"
                  onClick={() => setShowModality(!showModality)}>
                  Modalidade
                  {showModality ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                </div>
                {showModality && (
                  <div className="pb-4">
                    <div className="flex flex-row items-center mb-4">
                      <Checkbox id="face-to-face" />
                      <label htmlFor="face-to-face" className="ml-2 cursor-pointer">
                        Presencial
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="remote" />
                      <label htmlFor="remote" className="ml-2 cursor-pointer">
                        Remoto
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-6 flex flex-col border-2 border-lightgray1 rounded-md px-4 text-sm">
                <div
                  className="my-6 flex flex-row justify-between font-semibold"
                  onClick={() => setShowCategory(!showCategory)}>
                  Categoria
                  {showCategory ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                </div>
                {showCategory && (
                  <div className="pb-4">
                    <div className="flex flex-row items-center mb-4">
                      <Checkbox id="clt" />
                      <label htmlFor="clt" className="ml-2 cursor-pointer">
                        CLT
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="pj" />
                      <label htmlFor="pj" className="ml-2 cursor-pointer">
                        PJ
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="estagio" />
                      <label htmlFor="estagio" className="ml-2 cursor-pointer">
                        Estágio
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="trainee" />
                      <label htmlFor="trainee" className="ml-2 cursor-pointer">
                        Trainee
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="temporario" />
                      <label htmlFor="temporario" className="ml-2 cursor-pointer">
                        Temporário
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox id="freelance" />
                      <label htmlFor="freelance" className="ml-2 cursor-pointer">
                        Freelance
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
