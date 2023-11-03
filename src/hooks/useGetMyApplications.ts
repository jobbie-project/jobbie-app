import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';
import {RootState} from '@/store/store';
import {JobDataReturn} from './useGetJobList';
import {useSelector} from 'react-redux';

export function useGetMyApplications() {
  const jobFilters = useSelector((state: RootState) => state.jobFilters);
  const [jobData, setJobData] = React.useState<JobDataReturn>({
    total: 0,
    jobs: [],
    closed: 0,
    open: 0,
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get(`/job/my-applications${jobFilters?.page ? `?page=${jobFilters?.page}` : ''}`);
      setJobData(data);
    } catch (error) {
      setError(error as any);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, [jobFilters?.page]);

  return {
    jobData,
    loading,
    error,
  };
}
