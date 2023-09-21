import {useLocation} from 'react-router-dom';
import {MdKeyboardArrowRight} from 'react-icons/md';

interface BreadCrumbComponentProps {
  className?: string;
}

export default function BreadCrumbComponent(props: BreadCrumbComponentProps) {
  const location = useLocation();

  return (
    <div className={`flex flex-row justify-start ${props.className}`}>
      {location.pathname[0] && <div className="text-sm font-semibold text-black">Início</div>}
      {location.pathname
        .split('/')
        .slice(1)
        .map((item, index) => {
          const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div key={index} className="flex items-center">
              <MdKeyboardArrowRight />
              <div className="text-sm font-semibold text-black">{capitalizedItem}</div>
            </div>
          );
        })}
    </div>
  );
}
