import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

const data = [
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
  {
    code: '0001',
    date: '10/10/2021',
    roleStatus: 'Aberto',
    companyName: 'fsdfsdfsdf',
    numberOfCandidates: '70',
  },
];

// const navigate = useNavigate();

// const dispatch = useAppDispatch();

// const handleEdit = () => {};

// const handleDelete = () => {};

export default function TableList() {
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
        {data.map(data => (
          <TableRow key={data.code}>
            <TableCell>{data.code}</TableCell>
            <TableCell>{data.date}</TableCell>
            <TableCell>{data.roleStatus}</TableCell>
            <TableCell>{data.companyName}</TableCell>
            <TableCell>{data.numberOfCandidates}</TableCell>
            <TableCell className="text-right">
              <div className="max-w-[60px] ml-4">
                <div className="flex justify-between">
                  <div>{<FiEdit size={20} className="cursor-pointer" />}</div>
                  <div>{<FiTrash size={20} className="cursor-pointer" />}</div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
