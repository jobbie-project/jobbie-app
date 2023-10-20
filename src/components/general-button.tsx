interface GeneralButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  callback?: () => void;
}

export function GeneralButton(props: GeneralButtonProps) {
  return (
    <div className="w-full flex justify-center">
      <button
        onClick={props.callback}
        type={props.type}
        className={`mt-6 px-6 text-sm bg-redDefault font-normal w-full text-white rounded py-3 block shadow-xl ${props.className}`}>
        {props.text}
      </button>
    </div>
  );
}
