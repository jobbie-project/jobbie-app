import {Select, Option} from '@material-tailwind/react';

interface SelectDropdownProps {
  label: string;
  callback?: (value: string) => void;
  className?: string;
}

export function SelectDropdown(props: SelectDropdownProps) {
  return (
    <div className="">
      <Select
        labelProps={{
          className: 'before:border-0 after:border-0',
        }}
        className={`bg-lightgray1 rounded-lg green w-full border-none  ${props.className}`}
        label={props.label}
        animate={{
          mount: {y: 0},
          unmount: {y: 25},
        }}>
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}
