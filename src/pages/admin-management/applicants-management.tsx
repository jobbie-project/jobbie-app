import ApplicantsList from '@/components/applicants-table';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {Job} from '@/interfaces/job';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {JobApplicants} from '@/interfaces/job-applicants';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import {useGetJobList} from '@/hooks/useGetJobList';
import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {FiTrash} from 'react-icons/fi';
import {MdOutlineAttachEmail} from 'react-icons/md';

export default function ApplicantsManagement() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [jobApplicants, setJobApplicants] = useState<JobApplicants[]>();
  const {jobData, deleteJob} = useGetJobList();
  const code = params.get('codigo');
  const handleEdit = (code: string) => {
    navigate(`/vaga/editar?codigo=${code}`);
  };

  const fetchJob = async () => {
    try {
      if (code && code !== undefined) {
        const {data} = await Api.get(`/job/applicants/${code}`);
        console.log(data.applicants);
        setJobApplicants(data.applicants);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const sendTo = () => {
    navigate('/nova-vaga/passo-1');
  };

  const finishSorting = (code: string) => {};

  return (
    <>
      <Header />
      <div className="max-w w-full flex justify-center">
        <div className="max-w-3xl py-6">
          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div className="font-semibold my-4">Candidaturas da vaga {code}</div>
              <div className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="none"
                        onClick={() => deleteJob(code ?? '')}
                        className="bg-redDefault text-white mx-2">
                        {<FiTrash size={20} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>deletar vaga</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="none"
                        onClick={() => finishSorting(code ?? '')}
                        className="bg-redDefault text-white">
                        {<MdOutlineAttachEmail size={20} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>deletar vaga</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <SearchBar className="mb-4" placeholder="Código da vaga, nome da empresa" />
            <ApplicantsList applicants={jobApplicants ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}
