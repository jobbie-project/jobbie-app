import {User} from '@/interfaces/user';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import React from 'react';

export function useGetUserData() {
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const {data} = await Api.get(`/user`);
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      setError(error as any);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user: user,
    loading,
    error,
  };
}
