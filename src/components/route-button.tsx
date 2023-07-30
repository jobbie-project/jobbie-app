import Link from "next/link";

interface RouteButtonProps {
  text: string;
  link: string;
}

export function RouteButton(props: RouteButtonProps) {
  return (
    <Link href={props.link}>
      <button className="mt-8 text-lg bg-red font-normal w-full text-white rounded px-3 py-3 block shadow-xl">
        {props.text}
      </button>
    </Link>
  );
}
