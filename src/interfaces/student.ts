import {StudentShift} from '@/enums';
import {Curriculum} from './curriculum';

export interface Student {
  phone?: string;
  user: {id: string; name: string; email: string};
  birth_date?: Date;
  shift: StudentShift;
  curriculum: Curriculum;
}
