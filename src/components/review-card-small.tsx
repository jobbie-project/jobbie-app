import {deleteUserCertifications} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {FiTrash} from 'react-icons/fi';
import {toast} from 'react-toastify';

interface ReviewCardSmallProps {
  className?: string;
  title: string;
  canDelete: boolean;
  canEdit: boolean;
  index?: number;
}

export function ReviewCardSmall(props: ReviewCardSmallProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    props.index !== undefined && dispatch(deleteUserCertifications({index: props.index}));
    toast.success('Certificação removida com sucesso!');
  };

  return (
    <div className="max-w-md w-full bg-lightgray1 p-2 px-4 rounded-md text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-primaryGray ${props.className}`}>
        {props.title}
        <div className="flex flex-row">
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
    </div>
  );
}
