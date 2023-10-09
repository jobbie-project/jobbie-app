import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useGetJobList} from '@/hooks/useGetJobList';
import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {useAppDispatch} from '@/store/store';
import {JobStatus} from '@/utils/consts';
import moment from '@/utils/moment';
import {useEffect, useState} from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export default function TableList() {
  const {jobData} = useGetJobList();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    // props.editRoute
  };
  const handleDelete = async (code: string) => {
    await Api.delete(`/job/${code}`);
  };

  return (
    <Table>
      <TableHeader>
        <div></div>
        <TableRow className="text-center">
          <TableHead>Código</TableHead>
          <TableHead>Data de criação</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Nome da Empresa</TableHead>
          <TableHead>Candidaturas</TableHead>
          <TableHead className="text-right">Gerenciamento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {jobData.jobs.length > 0 &&
          jobData.jobs.map(data => (
            <TableRow key={data.code}>
              <TableCell>{data.code}</TableCell>
              <TableCell>{moment(data.created_at).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{JobStatus.find(status => status.value === data.status)?.label}</TableCell>
              <TableCell>{data.company_name}</TableCell>
              <TableCell>{10 /* data.numberOfCandidates */}</TableCell>
              <TableCell className="text-right">
                <div className="max-w-[60px] ml-4">
                  <div className="flex justify-between">
                    <div>{<FiEdit size={20} className="cursor-pointer" />}</div>
                    <div onClick={() => handleDelete(data.code)}>
                      {<FiTrash size={20} className="cursor-pointer" />}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
