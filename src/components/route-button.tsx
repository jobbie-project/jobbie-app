import {Link} from 'react-router-dom';

interface RouteButtonProps {
  text: string;
  link: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
}

export function RouteButton(props: RouteButtonProps) {
  return (
    <Link className="w-full flex justify-center" to={props.link}>
      <button
        type={props.type}
        className={`mt-6 max-w-sm px-6 text-sm bg-redDefault font-normal w-full text-white rounded py-3 block shadow-xl ${props.className}`}>
        {props.text}
      </button>
    </Link>
  );
}
