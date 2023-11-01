import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import moment from '@/utils/moment';
import {AiOutlineEye} from 'react-icons/ai';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {JobApplicants} from '../interfaces/job-applicants';
import {Checkbox} from '@/components/ui/checkbox';

interface ApplicantsListProps {
  applicants: JobApplicants[];
  setSortedCallback: (id: string) => void;
}

export default function ApplicantsList(props: ApplicantsListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>Seleção</TableHead>
          <TableHead>Data de candidatura</TableHead>
          <TableHead>Curso</TableHead>
          <TableHead>Nome do Aluno</TableHead>
          <TableHead>Ciclo</TableHead>
          <TableHead className="text-right">Currículo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {props.applicants.length > 0 &&
          props.applicants.map(data => (
            <TableRow key={data.id}>
              <TableCell>
                <Checkbox
                  className="block ml-5"
                  id={data.id}
                  onClick={() => props.setSortedCallback(`${data.student_id}`)}
                />
              </TableCell>
              <TableCell>{moment(data.created_at).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{data.student.curriculum.fatec_course.abbreviation}</TableCell>
              <TableCell>{data.student.user.name}</TableCell>
              <TableCell>{data.student.curriculum.fatec_cycle}</TableCell>
              <TableCell className="text-right">
                <div className="max-w-[60px] ml-4">
                  <div className="flex justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{<AiOutlineEye size={20} className="cursor-pointer" />}</TooltipTrigger>
                        <TooltipContent>
                          <p>Visualizar currículo do candidato</p>
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
