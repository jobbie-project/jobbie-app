import * as React from 'react';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {FieldValues, Path, UseFormRegister} from 'react-hook-form';
import {cn} from '@/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export function DatePicker<T extends FieldValues>(props: {
  defaultValue?: string;
  register?: UseFormRegister<T>;
  registerName?: Path<T>;
  className?: string;
  label?: string;
  required?: boolean;
  callback?: (o: any) => any;
}) {
  const datePickerProps = props.register && props.registerName && props.register(props.registerName);
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          {...datePickerProps}
          defaultValue={props.defaultValue}
          variant={'outline'}
          id={`${props.registerName}`}
          className={`cn('w-[280px] text-sm justify-start text-left', !date && 'text-muted-foreground') ${props.className}`}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
