import {FieldValues, Path, UseFormRegister} from 'react-hook-form';

export default function GeneralInput<T extends FieldValues>(props: {
  registerName: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
  label: string;
}) {
  return (
    <>
      <div className="py-2" x-data="{ show: true }">
        <div className={`relative flex items-center ${props.className}`}>
          <input
            {...props.register(props.registerName)}
            id={`${props.registerName}`}
            placeholder=""
            type="text"
            className="peer h-10 w-full border-b-2 border-gray1 text-gray-900 focus:outline-none focus:border-red"
          />
          <label
            htmlFor={`${props.registerName}`}
            className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
            {props.label}
          </label>
        </div>
      </div>
    </>
  );
}
