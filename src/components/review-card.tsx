import {FiEdit, FiTrash} from 'react-icons/fi';

interface ReviewCardProps {
  className?: string;
}

export function ReviewCard(props: ReviewCardProps) {
  return (
    <div className="max-w-sm w-full bg-lightgray1 p-4 rounded-lg text-sm">
      <div className="flex flex-row justify-between">
        Nome do curso
        <div className="flex flex-row">
          <FiEdit size={20} className="mr-1" />
          <FiTrash size={20} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mt-4">nome da faculdade</div>
        <div className="mt-4">ciclo - 10/11/1998</div>
      </div>
    </div>
  );
}
