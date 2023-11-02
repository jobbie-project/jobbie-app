import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';

export function useGetJobList() {
  const [jobData, setJobData] = React.useState<{total: number; jobs: Job[]; closed: number; open: number}>({
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

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get('/job');
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
    deleteJob,
    error,
  };
}
