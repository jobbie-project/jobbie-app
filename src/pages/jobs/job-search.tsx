import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import CardLarge from '@/components/card-large';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Checkbox} from '@/components/ui/checkbox';
import {useEffect, useState} from 'react';
import {useGetJobList} from '@/hooks/useGetJobList';
import {useAppDispatch} from '@/store/store';
import {clearFilters, setContractType, setJobType, setSearchTerm} from '@/store/slices/job-filters';
import {ContractType, JobType} from '@/enums';

const numberOfJobs = 30;

export default function JobSearch() {
  const [showModality, setShowModality] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const [selectedJobContractType, setSelectedJobContractType] = useState<string[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
  const {jobData} = useGetJobList();
  const onSubmit = () => {
    dispatch(setSearchTerm(search));
    dispatch(setContractType(selectedJobContractType as ContractType[]));
    dispatch(setJobType(selectedJobType as JobType[]));
  };

  const handleSelectedJobContractType = (contractType: string) => {
    const alreadySelected = selectedJobContractType.includes(contractType);
    if (alreadySelected) {
      setSelectedJobContractType(selectedJobContractType.filter(item => item !== contractType));
    } else setSelectedJobContractType([...selectedJobContractType, contractType]);
  };

  const handleSelectedJobType = (type: string) => {
    const alreadySelected = selectedJobType.includes(type);
    if (alreadySelected) {
      setSelectedJobType(selectedJobType.filter(item => item !== type));
    } else setSelectedJobType([...selectedJobType, type]);
  };

  const clearJobFilters = () => {
    dispatch(clearFilters());
    setSelectedJobContractType([]);
    setSelectedJobType([]);
    setSearch('');
  };

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  return (
    <div className="w-full select-none">
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <BreadCrumbComponent className="my-10" />
          <div className="flex flex-row">
            <SearchBar onChange={setSearch} value={search} />
            <Button onClick={onSubmit} variant="none" className="ml-4 h-12 px-6 text-white bg-redDefault">
              Pesquisar
            </Button>
          </div>
          <div className="w-full flex flex-row mt-8 justify-between">
            <div className="w-full">
              {jobData.jobs.map((job, index) => (
                <CardLarge job={job} key={index} code={job.code} />
              ))}
              <div className="flex flex-row my-8 justify-center">
                <Stack spacing={2}>
                  <Pagination count={numberOfJobs} shape="rounded" />
                </Stack>
              </div>
            </div>
            <div className="flex flex-col ml-6 w-96">
              <span className="text-xs text-lightblack">{jobData.jobs.length} Resultados</span>
              <div className="flex flex-row justify-between border-2 border-lightgray1 rounded-md p-4 my-6 font-semibold text-sm">
                Filtros{' '}
                <span onClick={() => clearJobFilters()} className="cursor-pointer text-xs mt-1 text-primaryGray">
                  Limpar
                </span>
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
                      <Checkbox
                        id={JobType.FACE_TO_FACE}
                        onClick={e => {
                          handleSelectedJobType(e.currentTarget.id);
                        }}
                        checked={selectedJobType.includes(JobType.FACE_TO_FACE)}
                      />
                      <label htmlFor={JobType.FACE_TO_FACE} className="ml-2 cursor-pointer">
                        Presencial
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-4">
                      <Checkbox
                        id={JobType.REMOTE}
                        onClick={e => {
                          handleSelectedJobType(e.currentTarget.id);
                        }}
                        checked={selectedJobType.includes(JobType.REMOTE)}
                      />
                      <label htmlFor={JobType.REMOTE} className="ml-2 cursor-pointer">
                        Remoto
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={JobType.HYBRID}
                        onClick={e => {
                          handleSelectedJobType(e.currentTarget.id);
                        }}
                        checked={selectedJobType.includes(JobType.HYBRID)}
                      />
                      <label htmlFor={JobType.HYBRID} className="ml-2 cursor-pointer">
                        Híbrido
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
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.CLT}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.CLT)}
                      />
                      <label htmlFor={ContractType.CLT} className="ml-2 cursor-pointer">
                        Efetivo
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.PJ}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.PJ)}
                      />
                      <label htmlFor={ContractType.PJ} className="ml-2 cursor-pointer">
                        PJ
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.INTERNSHIP}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.INTERNSHIP)}
                      />
                      <label htmlFor={ContractType.INTERNSHIP} className="ml-2 cursor-pointer">
                        Estágio
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.TRAINEE}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.TRAINEE)}
                      />
                      <label htmlFor={ContractType.TRAINEE} className="ml-2 cursor-pointer">
                        Trainee
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.TEMPORARY}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.TEMPORARY)}
                      />
                      <label htmlFor={ContractType.TEMPORARY} className="ml-2 cursor-pointer">
                        Temporário
                      </label>
                    </div>
                    <div className="flex flex-row items-center mb-2">
                      <Checkbox
                        id={ContractType.FREE_LANCER}
                        onClick={e => {
                          handleSelectedJobContractType(e.currentTarget.id);
                        }}
                        checked={selectedJobContractType.includes(ContractType.FREE_LANCER)}
                      />
                      <label htmlFor={ContractType.FREE_LANCER} className="ml-2 cursor-pointer">
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
