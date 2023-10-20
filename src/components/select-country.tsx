import {toast} from 'react-toastify';

export function SelectCountry() {
  const notAdded = () => {
    toast.error('Oops! Funcionalidade ainda não implementada.', {
      icon: '🥺',
    });
  };

  return (
    <div className="mt-4 w-full">
      <div className="font-semibold select-none text-sm">País</div>
      <div className="flex flex-row justify-between mb-6">
        <span className="select-none text-sm text-lightblack">Brasil</span>
        <div onClick={notAdded} className="text-sm relative text-gray-400 select-none cursor-pointer">
          Alterar
        </div>
      </div>
    </div>
  );
}
