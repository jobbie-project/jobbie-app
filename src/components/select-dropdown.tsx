import {ValueOption} from '@/interfaces/option';
import {Select, Option} from '@material-tailwind/react';

interface SelectDropdownProps {
  label: string;
  callback: (option: string) => void;
  className?: string;
  options: ValueOption[];
  disabled?: boolean;
  value: string;
}

export function SelectDropdown(props: SelectDropdownProps) {
  return (
    <div className="mt-6 mb-4">
      <Select
        labelProps={{
          className: 'before:border-0 after:border-0',
        }}
        className={`bg-lightgray1 rounded-lg w-full border-none ${props.className}`}
        label={props.label}
        disabled={props.disabled}
        onChange={option => props.callback(option ?? '')}
        value={props.value}
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
