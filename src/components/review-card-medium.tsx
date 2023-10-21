import {deleteUserEducation} from '@/store/slices/profile-data';
import {removeUserEducation} from '@/store/slices/update-profile-data';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

interface ReviewCardMediumProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  info?: string;
  start_date?: string;
  end_date?: string;
  canDelete: boolean;
  userIsBeignUpdated?: boolean;
  editRoute: string;
  index?: number;
  isFatec?: boolean;
  titleForText1?: string;
  titleForText2?: string;
  titleForText3?: string;
}

export function ReviewCardMedium(props: ReviewCardMediumProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    props.editRoute && navigate(props.editRoute);
  };

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (props.index !== undefined) {
      dispatch(
        props.userIsBeignUpdated
          ? removeUserEducation({index: props.index})
          : deleteUserEducation({index: props.index}),
      );
    }
    toast.success('Formação removida com sucesso!');
  };

  return (
    <div className="max-w-md w-full bg-lightgray1 p-4 rounded-md text-sm mb-4 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.info}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 text-primaryGray flex flex-row">
          <div className="font-semibold mr-1">{props.titleForText1}</div>
          {props.title}
        </div>
        <div className="mt-4 font-medium text-primaryGray flex flex-row">
          <div className="font-semibold mr-1">{props.titleForText2}</div>
          {props.subtitle}
        </div>
        <div className="mt-4 flex flex-row font-medium text-primaryGray">
          <div className="font-semibold mr-1">{props.titleForText3}</div>
          {props.description ? `${props.description}, ` : ''}
          {props.end_date ? 'de ' : 'desde '}
          {props.start_date}
          {props.end_date ? ` até ${props.end_date}` : ' até atualmente.'}
        </div>
      </div>
    </div>
  );
}
