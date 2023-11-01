import {Student} from '@/interfaces/student';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import {useEffect, useState} from 'react';

export function useGetStudentData(id: string) {
  const [student, setStudent] = useState<Student>();
  const [loading, setLoading] = useState(false);
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get(`/student/${id}`);
      setStudent(data.student);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return {
    student: student,
    loading,
  };
}
