import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';
import {useWindowSize} from '@/hooks/useWindowSize';
import {ServerDownIcon} from '@/icons/server-down-icon';

export default function ServerDown() {
  const [wasShown, setWasShown] = useState(false);
  const {width} = useWindowSize();

  useEffect(() => {
    if (!wasShown) {
      toast.error('Estamos enfrentando problemas, tente novamente mais tarde.');
      setWasShown(true);
      setTimeout(() => {
        setWasShown(false);
      }, 2000);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="h-full flex flex-col items-center">
        <div className="flex flex-col my-auto">
          {width <= 500 ? (
            <div className="p-10">
              <div className="font-semibold text-2xl flex flex-col justify-center items-center">
                <p className="mb-2">Ops!</p>
                <p className="text-lg">Parece que você foi desconectado do servidor.</p>
              </div>
            </div>
          ) : (
            <div className="font-semibold text-2xl flex flex-col justify-center items-center">
              <p className="mb-2">Ops!</p>
              <p className="text-lg">Parece que você foi desconectado do servidor.</p>
            </div>
          )}
          <div className="flex justify-center">
            <ServerDownIcon width="460" height="460" />
          </div>
        </div>
      </div>
    </div>
  );
}
