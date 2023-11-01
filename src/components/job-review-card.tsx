import {deleteUserPreviousExperience} from '@/store/slices/profile-data';
import {removeUserPreviousExperience} from '@/store/slices/update-profile-data';
import {useAppDispatch} from '@/store/store';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

interface JobReviewCardProps {
  maxW?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined;
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  canDelete: boolean;
  userIsBeignUpdated?: boolean;
  editRoute?: string;
  index?: number;
  titleForText1?: string;
  titleForText2?: string;
  titleForText3?: string;
}

export function JobReviewCard(props: JobReviewCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    props.editRoute && navigate(props.editRoute);
  };

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    props.index !== undefined &&
      dispatch(
        props.userIsBeignUpdated
          ? removeUserPreviousExperience({index: props.index})
          : deleteUserPreviousExperience({index: props.index}),
      );
    toast.success('Experiência removida com sucesso!');
  };

  return (
    <div
      className={`${
        props.maxW !== undefined && `max-w-${props.maxW}`
      } w-full bg-lightgray1 p-4 rounded-md text-sm mb-4 select-none`}>
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {`Cargo: ${props.title}`}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.editRoute && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
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
