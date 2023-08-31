interface ButtonHoverProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  callback?: () => void;
}

export function ButtonHover(props: ButtonHoverProps) {
  return (
    <div className="w-40 justify-center text-center flex flex-row btn group place-content ">
      <button
        onClick={props.callback}
        type={props.type}
        className={`bg-transparent p-2 px-6 text-lightblack relative pr-4 pb-1 after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-lightgreen2 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100 ${props.className}`}>
        {props.text}
      </button>
      <svg
        viewBox="0 0 46 16"
        height="10"
        width="28"
        xmlns="http://www.w3.org/2000/svg"
        id="arrow-horizontal"
        className="-translate-x-2 mt-5 fill-slate-400 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-x-105 group-hover:fill-black">
        <path
          transform="translate(20)"
          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
          data-name="Path 10"
          id="Path_10"></path>
      </svg>
    </div>
  );
}
