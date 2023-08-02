import Link from "next/link";

interface RouteButtonProps {
  text: string;
  link: string;
}

export function RouteButton(props: RouteButtonProps) {
  return (
    <Link className="w-full flex justify-center" href={props.link}>
      <button className="mt-6 max-w-sm px-6 text-lg bg-red font-normal w-full text-white rounded py-3 block shadow-xl">
        {props.text}
      </button>
    </Link>
  );
}
