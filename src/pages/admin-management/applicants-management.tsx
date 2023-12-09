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
import CvIcon from '@/icons/cvs';
import BreadCrumbComponent from '@/components/breadcrumb';
import {IsEmpty} from '@/icons/empty';
import {Footer} from '@/components/footer';
export default function ApplicantsManagement() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [jobApplicants, setJobApplicants] = useState<JobApplicants[]>();
  const [emailTo, setEmailTo] = useState<string>('');
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const code = params.get('codigo');
  const [studentName, setStudentName] = useState<string>('');
  const fetchJob = async () => {
    try {
      if (code && code !== undefined) {
        const {data} = await Api.get(`/job/applicants/${code}?student_name=${studentName}`);
        setJobApplicants(data.applicants);
      }
    } catch (error) {
      toastError(error);
    }
  };

  const onSubmit = () => {
    setStudentName(studentName);
    fetchJob();
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
      setLoading(true);
      await Api.post(`/job/applicants/${code}/sorted-students`, {email: emailTo, studentIds: sortedIds});
      toast.success('Currículos enviados com sucesso!');
      setLoading(false);
      navigate('/gerenciamento');
    } catch (error) {
      setLoading(false);
      toastError(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full py-6">
          <div className="w-full">
            <BreadCrumbComponent className="my-4" />
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
            <SearchBar className="mb-4" placeholder="Nome do aluno" onClick={onSubmit} onChange={setStudentName} />
            {jobApplicants?.length !== undefined && jobApplicants?.length > 0 ? (
              <ApplicantsList applicants={jobApplicants ?? []} setSortedCallback={handleSelectStudent} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <IsEmpty width="380" height="380" />
                <p className="font-semibold">Parece que não há candidatos ainda..</p>
              </div>
            )}
          </div>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-col items-center">
                  <CvIcon width="120" height="160" />
                  <p className="mt-4 text-base">Os currículos estão prontos para serem enviados!</p>
                </div>
              </DialogTitle>
              <DialogDescription className="flex justify-center flex-col text-sm text-black">
                <span className="mt-2 text-sm">
                  Insira aqui o e-mail para o qual deseja enviar os currículos selecionados.
                </span>
                <GeneralInput label="E-mail" type="email" callback={setEmailTo} />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  loading ? null : sendSorting(code ?? '');
                }}
                variant="none"
                className={`${
                  loading && 'opacity-50 cursor-wait'
                } bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white`}>
                Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
}
