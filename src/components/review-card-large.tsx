import {deleteUserCertifications} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

interface ReviewCardLargeProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  canDelete: boolean;
  index?: number;
  editRoute?: string;
}

export function ReviewCardLarge(props: ReviewCardLargeProps) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    props.editRoute && navigate(props.editRoute);
  };

  const handleDelete = () => {
    props.index !== undefined && dispatch(deleteUserCertifications({index: props.index}));
  };

  return (
    <div className="max-w-sm w-full bg-lightgray1 p-4 rounded-lg text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.title}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-medium text-gray3 ">{props.subtitle}</div>
        <div className="mt-4 font-medium text-gray3 ">{props.description}</div>
      </div>
    </div>
  );
}
