import {Autocomplete} from '@mui/material';

export function SelectInput(props: {options: string[]; callback: (o: any) => any}) {
  return (
    <Autocomplete
      disablePortal
      onChange={(_, value) => {
        props.callback(value);
      }}
      options={props.options}
      renderInput={params => (
        <div className="py-2 mt-2">
          <div className="relative flex items-center" ref={params.InputProps.ref}>
            <input
              {...params.inputProps}
              placeholder=""
              className="peer h-10 w-full border-b-[3px] border-gray1 text-gray-900 focus:outline-none focus:border-redDefault text-sm"
              type="text"
              id="location"
            />
            <label
              htmlFor="location"
              className={`absolute cursor-text left-0 select-none text-gray-600 text-sm transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 -top-3.5
        peer-focus:text-gray-600 peer-focus:text-sm`}>
              Cidade, Estado
            </label>
          </div>
        </div>
      )}
    />
  );
}
