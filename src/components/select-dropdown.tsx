import {Select, Option} from '@material-tailwind/react';
import React from 'react';

interface SelectDropdownProps {
  label: string;
  callback?: (value: number) => void;
  className?: string;
  options: {value: string; label: string}[];
  disabled?: boolean;
  defaultValue?: number;
}

export function SelectDropdown(props: SelectDropdownProps) {
  const [value, setValue] = React.useState<number | undefined>(props.defaultValue || undefined);

  const handleChange = (e: string | undefined) => {
    const newValue = Number(e) || undefined;
    setValue(newValue);
    props.callback && newValue && props.callback(newValue);
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
        value={props.defaultValue ? `${value}` : undefined}
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
