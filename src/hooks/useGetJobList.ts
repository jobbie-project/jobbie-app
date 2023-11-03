import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {RootState} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import React from 'react';
import {useSelector} from 'react-redux';

export interface JobDataReturn {
  total: number;
  jobs: Job[];
  closed: number;
  open: number;
}

export function useGetJobList() {
  const jobFilters = useSelector((state: RootState) => state.jobFilters);
  const [jobData, setJobData] = React.useState<JobDataReturn>({
    total: 0,
    jobs: [],
    closed: 0,
    open: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const deleteJob = async (code: string) => {
    setLoading(true);
    await Api.delete(`/job/${code}`);
    await fetchJobs();
    setLoading(false);
  };

  React.useEffect(() => {
    fetchJobs();
  }, [
    jobFilters?.searchTerm,
    jobFilters?.contractType,
    jobFilters?.jobType,
    jobFilters?.page,
    jobFilters?.code,
    jobFilters?.studentName,
  ]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let url = `/job?`;
      if (jobFilters?.page) {
        url += `page=${jobFilters?.page}&`;
      }
      if (jobFilters?.searchTerm) {
        url += `position=${jobFilters?.searchTerm}&`;
      }
      if (jobFilters.code) {
        url += `code=${jobFilters.code}&`;
      }
      if (jobFilters.studentName) {
        url += `student_name=${jobFilters.studentName}&`;
      }
      if (jobFilters?.contractType) {
        url += `${jobFilters.contractType.map(type => `contract_type=${type}&`).join('')}`;
      }
      if (jobFilters?.jobType) {
        url += `${jobFilters.jobType.map(type => `type=${type}&`).join('')}`;
      }
      const {data} = await Api.get(url);
      setJobData(data);
    } catch (error) {
      setError(error as any);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobData,
    loading,
    deleteJob,
    error,
  };
}
