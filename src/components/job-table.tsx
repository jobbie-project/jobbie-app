import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {JobDataReturn} from '@/hooks/useGetJobList';
import {JobStatus} from '@/utils/consts';
import moment from '@/utils/moment';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {RiNewspaperLine} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

export default function JobList({
  jobData,
  deleteJob,
}: {
  jobData: JobDataReturn;
  deleteJob: (code: string) => Promise<void>;
}) {
  const navigate = useNavigate();
  const handleEdit = (code: string) => {
    navigate(`/vaga/editar?codigo=${code}`);
  };

  const handleGoToApplicants = (code: string) => {
    navigate(`/gerenciamento/candidatos?codigo=${code}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Código</TableHead>
          <TableHead className="text-center">Data de criação</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Nome da Empresa</TableHead>
          <TableHead className="text-center">Candidaturas</TableHead>
          <TableHead className="text-center">Gerenciamento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center cursor-pointer">
        {jobData?.jobs?.length > 0 &&
          jobData?.jobs?.map(data => (
            <TableRow key={data.code}>
              <TableCell>{data.code}</TableCell>
              <TableCell>{moment(data.created_at).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{JobStatus.find(status => status.value === data.status)?.label}</TableCell>
              <TableCell>{data.company_name}</TableCell>
              <TableCell>{data.applicants?.length ?? 0}</TableCell>
              <TableCell className="text-center">
                <div className="max-w-[60px] ml-4">
                  <div className="flex justify-between ml-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div onClick={() => handleGoToApplicants(data.code)}>
                            {<RiNewspaperLine size={20} className="cursor-pointer" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>visualizar candidaturas</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="ml-1" onClick={() => handleEdit(data.code)}>
                            {<FiEdit size={20} className="cursor-pointer" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>editar vaga</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div onClick={() => deleteJob(data.code)}>
                            {<FiTrash size={20} className="cursor-pointer" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>deletar vaga</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
