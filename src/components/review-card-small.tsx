import {deleteUserCertifications} from '@/store/slices/profile-data';
import {deleteUpdateUserCertifications} from '@/store/slices/update-profile-data';
import {useAppDispatch} from '@/store/store';
import {FiTrash} from 'react-icons/fi';
import {toast} from 'react-toastify';

interface ReviewCardSmallProps {
  maxW?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined;
  className?: string;
  title: string;
  canDelete: boolean;
  canEdit: boolean;
  index?: number;
  userIsBeignUpdated?: boolean;
}

export function ReviewCardSmall(props: ReviewCardSmallProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    props.index !== undefined &&
      dispatch(
        props.userIsBeignUpdated
          ? deleteUpdateUserCertifications({index: props.index})
          : deleteUserCertifications({index: props.index}),
      );
    toast.success('Certificação removida com sucesso!');
  };

  return (
    <div
      className={`${
        props.maxW !== undefined && `max-w-${props.maxW}`
      } w-full bg-lightgray1 p-2 px-4 rounded-md text-sm mb-4 select-none`}>
      <div className={`flex flex-row justify-between font-semibold text-primaryGray ${props.className}`}>
        {props.title}
        <div className="flex flex-row">
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
    </div>
  );
}
