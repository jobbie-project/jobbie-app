import {ContractType, EducationLevel, JobTime} from '@/enums';
import {ValueOption} from '@/interfaces/option';

export const Degrees: ValueOption[] = [
  {value: EducationLevel.TECHNICAL, label: 'Técnico'},
  {value: EducationLevel.UNDERGRADUATE, label: 'Graduação'},
  {value: EducationLevel.POSTGRADUATE, label: 'Pós-graduação'},
  {value: EducationLevel.MASTER, label: 'Mestrado'},
  {value: EducationLevel.DOCTORATE, label: 'Doutorado'},
];

export const ContractTypes = [
  {value: ContractType.CLT, label: 'CLT'},
  {value: ContractType.PJ, label: 'PJ'},
  {value: ContractType.INTERNSHIP, label: 'Estágio'},
  {value: ContractType.TRAINEE, label: 'Trainee'},
  {value: ContractType.TEMPORARY, label: 'Temporário'},
  {value: ContractType.FREE_LANCER, label: 'Freelance'},
];

export const JobTimes = [
  {value: JobTime.FULL_TIME, label: 'Integral'},
  {value: JobTime.PART_TIME, label: 'Parcial'},
  {value: JobTime.TO_MATCH, label: 'A combinar'},
];

export const JobStatus = [
  {value: 'open', label: 'Aberto'},
  {value: 'inactive', label: 'Inativo'},
  {value: 'closed', label: 'Fechado'},
];
