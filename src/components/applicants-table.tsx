import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import moment from '@/utils/moment';
import {AiOutlineEye} from 'react-icons/ai';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {JobApplicants} from '../interfaces/job-applicants';
import {Checkbox} from '@/components/ui/checkbox';
import {useState} from 'react';
import CurriculumViewComponent from './curriculum-view';
import {ButtonHover} from './button-hover-animation';
interface ApplicantsListProps {
  applicants: JobApplicants[];
  setSortedCallback: (id: string) => void;
}

export default function ApplicantsList(props: ApplicantsListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  return (
    <div>
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
                          <TooltipTrigger>
                            {
                              <AiOutlineEye
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelectedId(data.student_id);
                                }}
                                size={20}
                                className="cursor-pointer"
                              />
                            }
                          </TooltipTrigger>
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
      {isOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-warmGray-600 bg-opacity-40 flex">
          <div className="m-auto flex flex-col items-center bg-white overflow-y-scroll h-[90%] w-[25%] px-5">
            <CurriculumViewComponent studentId={selectedId} />

            <div className="mb-5">
              <ButtonHover
                divClassName="w-full"
                text={'Fechar visualização'}
                type={'button'}
                callback={() => {
                  setIsOpen(false);
                  setSelectedId('');
                }}
                className="font-semibold text-base b-10 w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
