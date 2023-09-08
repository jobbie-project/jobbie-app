import {FiEdit, FiTrash} from 'react-icons/fi';

interface ReviewCardMediumProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  canDelete: boolean;
  canEdit: boolean;
}

export function ReviewCardMedium(props: ReviewCardMediumProps) {
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <div className="max-w-sm w-full bg-lightgray1 p-4 rounded-lg text-sm mb-6 select-none">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.title}
        <div className="flex flex-row">
          <div onClick={handleEdit}>{props.canEdit && <FiEdit size={20} className="mr-1 cursor-pointer" />}</div>
          <div onClick={handleDelete}>{props.canDelete && <FiTrash size={20} className="cursor-pointer" />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-medium text-gray3 ">{props.subtitle}</div>
        <div className="mt-4 flex flex-row font-medium text-gray3">
          {props.description ? `Ciclo: ${props.description}` : ''} Desde {props.start_date} até{' '}
          {props.end_date ?? 'Atualmente'}
        </div>
      </div>
    </div>
  );
}
