import {EducationLevel} from '@/enums';
import {ValueOption} from '@/interfaces/option';

export const Degrees: ValueOption[] = [
  {value: EducationLevel.TECHNICAL, label: 'Técnico'},
  {value: EducationLevel.UNDERGRADUATE, label: 'Graduação'},
  {value: EducationLevel.POSTGRADUATE, label: 'Pós-graduação'},
  {value: EducationLevel.MASTER, label: 'Mestrado'},
  {value: EducationLevel.DOCTORATE, label: 'Doutorado'},
];

export const FatecInstitutions = [
  {value: '1', label: 'Fatec Araçatuba'},
  {value: '2', label: 'Fatec Araraquara'},
  {value: '3', label: 'Fatec Barueri'},
  {value: '4', label: 'Fatec Bauru'},
  {value: '5', label: 'Fatec Botucatu'},
  {value: '6', label: 'Fatec Bragança Paulista'},
  {value: '7', label: 'Fatec Ribeirão Preto'},
];

export const Courses = [
  {value: '1', label: 'Análise e Desenvolvimento de Sistemas'},
  {value: '2', label: 'Gestão e Inovação de Negócios'},
  {value: '3', label: 'Sistemas Biomédicos'},
];

export const ContractTypes = [
  {value: '1', label: 'CLT'},
  {value: '2', label: 'PJ'},
  {value: '3', label: 'Estágio'},
  {value: '4', label: 'Trainee'},
  {value: '5', label: 'Temporário'},
  {value: '6', label: 'Freelancer'},
];

export const JobTime = [
  {value: '1', label: 'Integral'},
  {value: '2', label: 'Parcial'},
  {value: '3', label: 'A combinar'},
];
