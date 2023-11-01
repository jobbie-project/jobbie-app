import {Student} from './student';

export interface JobApplicants {
  id: string;
  was_sended: boolean;
  student_id: string;
  job_id: string;
  student: Student;
  created_at: Date;
}
