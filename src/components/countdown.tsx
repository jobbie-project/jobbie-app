import moment from '@/utils/moment';
import {useEffect, useState} from 'react';

interface CountdownProps {
  time: number;
  callback: () => void;
}

export function Countdown(props: CountdownProps) {
  const [time, setTime] = useState(props.time);
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      props.callback();
    }
  }, [time]);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="font-semibold text-gray3">{moment().startOf('day').seconds(time).format('mm:ss')}</div>
    </div>
  );
}
