import {deleteUserEducation} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

interface ReviewCardMediumProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  info?: string;
  start_date?: string;
  end_date?: string;
  canDelete: boolean;
  editRoute: string;
  index?: number;
  isFatec?: boolean;
}

export function ReviewCardMedium(props: ReviewCardMediumProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    props.editRoute && navigate(props.editRoute);
  };

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    props.index !== undefined && dispatch(deleteUserEducation({index: props.index}));
  };

  return (
    <div className="max-w-xl w-full bg-lightgray1 p-4 rounded-lg text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.info}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-medium text-primaryGray">{props.title}</div>
        <div className="mt-4 font-medium text-primaryGray">{props.subtitle}</div>
        <div className="mt-4 flex flex-row font-medium text-primaryGray">
          {props.description ? `Ciclo: ${props.description} ` : ''}
          {props.end_date ? 'De ' : 'Desde '}
          {props.start_date}
          {props.end_date ? ` até ${props.end_date}` : ' até atualmente.'}
        </div>
      </div>
    </div>
  );
}
