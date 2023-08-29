import { Link } from "react-router-dom";

interface RouteButtonProps {
  text: string;
  link: string;
  type: "button" | "submit" | "reset";
}

export function RouteButton(props: RouteButtonProps) {
  return (
    <Link className="w-full flex justify-center" to={props.link}>
      <button
        type={props.type}
        className="mt-6 max-w-sm px-6 text-lg bg-red font-normal w-full text-white rounded py-3 block shadow-xl"
      >
        {props.text}
      </button>
    </Link>
  );
}
