import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import TableList from '@/components/job-table';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import BreadCrumbComponent from '@/components/breadcrumb';
import {RolesIcon} from '@/icons/roles';
import {AvailableIcon} from '@/icons/available';
import {ClosedIcon} from '@/icons/closed';
import {Pagination, Stack} from '@mui/material';
import {useGetJobList} from '@/hooks/useGetJobList';
import {Footer} from '@/components/footer';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '@/store/store';
import {clearFilters, setJobCode, setPage} from '@/store/slices/job-filters';

export default function JobManagement() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const {jobData, deleteJob} = useGetJobList();
  const dispatch = useAppDispatch();
  const [homepagePage, setHomepagePage] = useState(1);

  const handleChange = (_: any, value: number) => {
    if (value !== homepagePage) {
      setHomepagePage(value);
      dispatch(setPage(value));
    }
  };
  useEffect(() => {
    setCode('');
    dispatch(clearFilters());
  }, []);

  const onSubmit = () => {
    dispatch(setJobCode(code));
  };

  const sendTo = () => {
    navigate('/nova-vaga/passo-1');
  };

  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full py-6">
          <div className="w-full">
            <BreadCrumbComponent className="my-4" />
            <div className="flex flex-row justify-between my-8">
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.total}</p>
                    <p className="text-sm text-black mt-2">Total de vagas</p>
                  </div>
                  <RolesIcon width="52" height="52" />
                </div>
              </div>
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.open}</p>
                    <p className="text-sm text-black mt-2">Em aberto</p>
                  </div>
                  <AvailableIcon width="52" height="52" />
                </div>
              </div>
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.closed}</p>
                    <p className="text-sm text-black mt-2">Finalizadas</p>
                  </div>
                  <ClosedIcon width="52" height="52" />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="font-semibold mt-4 mb-6">Gerenciamento de Vagas</div>
              <div className="flex items-center">
                <Button
                  variant="none"
                  onClick={sendTo}
                  className="bg-redDefault text-white hover:bg-lightgray1 hover:block hover:text-lightblack">
                  Publicar nova vaga
                </Button>
              </div>
            </div>
            <SearchBar
              className="mb-4"
              placeholder="Pesquise pelo código da vaga"
              value={code}
              onChange={setCode}
              onClick={onSubmit}
            />
            <TableList jobData={jobData} deleteJob={deleteJob} />
            <div className="flex flex-row m-8 justify-center">
              <Stack spacing={2}>
                <Pagination count={Math.ceil(jobData.total / 10)} shape="rounded" onChange={handleChange} />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
