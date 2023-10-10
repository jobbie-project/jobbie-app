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
  info?: string;
  titleForText1?: string;
  titleForText2?: string;
  titleForText3?: string;
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
    <div className="max-w-xl w-full bg-lightgray1 p-4 rounded-md text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.info}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-medium text-primaryGray flex flex-row">
          <div className="font-semibold mr-1">{props.titleForText1}</div>
          {props.title}
        </div>
        <div className="mt-4 font-medium text-primaryGray flex flex-row">
          <div className="font-semibold mr-1">{props.titleForText2}</div>
          {props.subtitle}
        </div>
        <div className="mt-4 font-medium text-primaryGray flex flex-row">
          <div className="font-semibold mr-1">{props.titleForText3}</div>
          {props.description}
        </div>
      </div>
    </div>
  );
}
