import ApplicantsList from '@/components/applicants-table';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {JobApplicants} from '@/interfaces/job-applicants';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {MdOutlineAttachEmail} from 'react-icons/md';
import * as EmailValidator from 'email-validator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {toast} from 'react-toastify';
import GeneralInput from '@/components/general-input';
export default function ApplicantsManagement() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [jobApplicants, setJobApplicants] = useState<JobApplicants[]>();
  const [emailTo, setEmailTo] = useState<string>('');
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  const code = params.get('codigo');

  const fetchJob = async () => {
    try {
      if (code && code !== undefined) {
        const {data} = await Api.get(`/job/applicants/${code}`);
        setJobApplicants(data.applicants);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const handleSelectStudent = (studentId: string) => {
    const alreadySorted = sortedIds.includes(studentId);
    if (alreadySorted) {
      setSortedIds(sortedIds.filter(id => id !== studentId));
    } else setSortedIds([...sortedIds, studentId]);
  };

  const sendSorting = async (code: string) => {
    try {
      if (!emailTo || !EmailValidator.validate(emailTo)) throw new Error('Insira um e-mail válido');
      await Api.post(`/job/applicants/${code}/sorted-students`, {email: emailTo, studentIds: sortedIds});
      toast.success('Currículos enviados com sucesso!');
      navigate('/gerenciamento');
    } catch (error) {
      toastError(error);
    }
  };

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
                        onClick={() => {
                          if (sortedIds.length > 0) setIsOpen(true);
                          else toast.error('Selecione ao menos um currículo para enviar');
                        }}
                        className="bg-redDefault text-white">
                        {<MdOutlineAttachEmail size={20} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enviar currículos selecionados</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <SearchBar className="mb-4" placeholder="Código da vaga, nome da empresa" />
            <ApplicantsList applicants={jobApplicants ?? []} setSortedCallback={handleSelectStudent} />
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex justify-center mt-2">
                Os currículos estão prontos para serem enviados!
              </DialogTitle>
              <DialogDescription className="flex justify-center flex-col text-sm text-black">
                <span className="mt-6">Insira aqui o e-mail para o qual deseja enviar os currículos selecionados.</span>
                <GeneralInput label="E-mail" type="email" callback={setEmailTo} />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  sendSorting(code ?? '');
                }}
                variant="none"
                className=" bg-lightgray1 font-semibold text-black">
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
