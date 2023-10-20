import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {FieldValues, Path, UseFormRegister} from 'react-hook-form';

import React from 'react';

export default function PasswordInput<T extends FieldValues>(props: {
  registerName: Path<T>;
  register: UseFormRegister<T>;
  className?: string;
  text: string;
}) {
  const [exibir, setExibir] = React.useState(true);

  return (
    <>
      <div className="py-2" x-data="{ show: true }">
        <div className={`relative flex items-center ${props.className}`}>
          <input
            {...props.register(props.registerName)}
            id={`${props.registerName}`}
            name={`${props.registerName}`}
            placeholder=""
            type={exibir ? 'password' : 'text'}
            className="peer h-10 w-full border-b-[3px] border-gray1 text-gray-900 focus:outline-none focus:border-redDefault"
          />
          <label
            htmlFor={`${props.registerName}`}
            className="absolute cursor-text left-0 -top-3.5 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
            {props.text}
          </label>

          <div className="flex absolute ml-[420px]" onClick={() => setExibir(!exibir)}>
            {exibir ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
          </div>
        </div>
      </div>
    </>
  );
}
