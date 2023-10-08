import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';

export function useGetJobData(code: string) {
  const [job, setJob] = React.useState<Job>();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const fetchJob = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get(`/job/${code}`);
      setJob(data.job);
    } catch (error) {
      setError(error as any);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJob();
  }, []);

  return {
    job: job,
    loading,
    error,
  };
}
