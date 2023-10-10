import {deleteUserPreviousExperience} from '@/store/slices/profile-data';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

interface JobReviewCardProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  canDelete: boolean;
  editRoute: string;
  index?: number;
}

export function JobReviewCard(props: JobReviewCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    props.editRoute && navigate(props.editRoute);
  };

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    props.index !== undefined && dispatch(deleteUserPreviousExperience({index: props.index}));
  };

  return (
    <div className="max-w-xl w-full bg-lightgray1 p-4 rounded-md text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {`Cargo: ${props.title}`}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
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
