import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';
import {JobDataReturn} from './useGetJobList';

export function useGetMyApplications() {
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
      const {data} = await Api.get('/job/my-applications');
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
  }, []);

  return {
    jobData,
    loading,
    error,
  };
}
