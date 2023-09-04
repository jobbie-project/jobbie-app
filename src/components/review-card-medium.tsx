import {FiEdit, FiTrash} from 'react-icons/fi';

interface ReviewCardMediumProps {
  className?: string;
  title: string;
  subtitle: string;
  description?: string;
  date?: string;
  canDelete: boolean;
  canEdit: boolean;
}

export function ReviewCardMedium(props: ReviewCardMediumProps) {
  return (
    <div className="max-w-sm w-full bg-lightgray1 p-4 rounded-lg text-sm">
      <div className={`flex flex-row justify-between font-semibold text-lightblack ${props.className}`}>
        {props.title}
        <div className="flex flex-row">
          <div>{props.canEdit && <FiEdit size={20} className="mr-1" />}</div>
          <div>{props.canDelete && <FiTrash size={20} />}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4 font-medium text-gray3 ">{props.subtitle}</div>
        <div className="mt-4 flex flex-row font-medium text-gray3">
          Ciclo: {props.description} Desde {props.date}
        </div>
      </div>
    </div>
  );
}
