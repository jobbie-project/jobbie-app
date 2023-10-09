import * as React from 'react';

import {cn} from '@/utils';

export default function TextareaProps(props: {
  defaultValue?: string;
  callback?: (value: string) => void;
  className?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
  placeholder?: string;
}) {
  return (
    <textarea
      defaultValue={props.defaultValue}
      onChange={e => props.callback && props.callback(e.target.value)}
      className={cn(
        'flex min-h-[200px] w-full rounded-md border  border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 whitespace-pre-wrap break-words text-justify',
        props.className,
      )}
      ref={props.ref}
      placeholder={props.placeholder}
      {...props}
    />
  );
}
