import {Job} from '@/interfaces/job';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';

export function useJobData() {
  const [jobData, setJobData] = React.useState<{total: number; jobs: Job[]}>({total: 0, jobs: []});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get('/job');
      setJobData(data);
    } catch (error) {
      setError(error as any);
      toastError(error);
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
