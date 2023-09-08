import {Select, Option} from '@material-tailwind/react';
import React from 'react';

interface SelectDropdownProps {
  label: string;
  callback?: (value: string) => void;
  className?: string;
  options: {value: string; label: string}[];
  disabled?: boolean;
  defaultValue?: string;
}

export function SelectDropdown(props: SelectDropdownProps) {
  const [value, setValue] = React.useState<string | undefined>(props.defaultValue || undefined);

  const handleChange = (selected: string | undefined) => {
    setValue(selected);
    props.callback && selected && props.callback(selected);
  };

  return (
    <div className="mt-6 mb-4">
      <Select
        labelProps={{
          className: 'before:border-0 after:border-0',
        }}
        className={`bg-lightgray1 rounded-lg w-full border-none ${props.className}`}
        label={props.label}
        disabled={props.disabled}
        onChange={handleChange}
        value={value}
        animate={{
          mount: {y: 0},
          unmount: {y: 25},
        }}>
        {props.options?.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
