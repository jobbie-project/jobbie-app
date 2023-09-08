import {FieldValues, Path, UseFormRegister} from 'react-hook-form';

export default function GeneralInput<T extends FieldValues>(props: {
  defaultValue?: string;
  registerName?: Path<T>;
  register?: UseFormRegister<T>;
  className?: string;
  label: string;
  required?: boolean;
  callback?: (o: any) => any;
  type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'month' | 'time';
}) {
  const inputProps = props.register && props.registerName && props.register(props.registerName);
  return (
    <>
      <div className="py-2 mt-2" x-data="{ show: true }">
        <div className={`relative flex items-center ${props.className}`}>
          <input
            {...inputProps}
            onChange={e => props.callback && props.callback(e.target.value)}
            defaultValue={props.defaultValue}
            placeholder=""
            id={`${props.registerName}`}
            className="peer h-10 w-full border-b-[3px] border-gray1 text-gray-900 focus:outline-none focus:border-redDefault text-sm"
            type={props.type || 'text'}
          />
          <label
            htmlFor={`${props.registerName}`}
            className={`absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
            ${!props.defaultValue && 'peer-focus:-top-3.5'}   peer-focus:text-gray-600 peer-focus:text-sm`}>
            {props.label}
            {props.required && <span className="text-redDefault font-bold">*</span>}
          </label>
        </div>
      </div>
    </>
  );
}
