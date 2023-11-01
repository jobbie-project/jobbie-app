import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useGetJobList} from '@/hooks/useGetJobList';
import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {useAppDispatch} from '@/store/store';
import {JobStatus} from '@/utils/consts';
import moment from '@/utils/moment';
import {useEffect, useState} from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {RiNewspaperLine} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

export default function JobList() {
  const {jobData, deleteJob} = useGetJobList();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleEdit = (code: string) => {
    navigate(`/vaga/editar?codigo=${code}`);
  };

  const handleGoToApplicants = (code: string) => {
    navigate(`/gerenciamento/candidatos?codigo=${code}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>Código</TableHead>
          <TableHead>Data de criação</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Nome da Empresa</TableHead>
          <TableHead>Candidaturas</TableHead>
          <TableHead className="text-right">Gerenciamento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center cursor-pointer">
        {jobData?.jobs?.length > 0 &&
          jobData?.jobs?.map(data => (
            <TableRow key={data.code} onClick={() => handleGoToApplicants(data.code)}>
              <TableCell>{data.code}</TableCell>
              <TableCell>{moment(data.created_at).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{JobStatus.find(status => status.value === data.status)?.label}</TableCell>
              <TableCell>{data.company_name}</TableCell>
              <TableCell>{data.applicants?.length ?? 0}</TableCell>
              <TableCell className="text-right">
                <div className="max-w-[60px] ml-4">
                  <div className="flex justify-between">
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
