import {FiPlus} from 'react-icons/fi';

interface AddNewButtonProps {
  className?: string;
  onClick?: () => void;
  navigate?: any;
}

export function AddNewButton(props: AddNewButtonProps) {
  return (
    <div className={`flex flex-row w-full max-w-sm text-sm ${props.className}`} onClick={props.onClick}>
      <div className="flex flex-row p-2 bg-lightgray1 rounded-lg cursor-pointer border-[3px]  border-transparent hover:border-redDefault">
        <FiPlus size={20} />
      </div>
    </div>
  );
}
