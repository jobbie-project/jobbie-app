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
