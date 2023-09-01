interface DropdownSelectionProps {
  className?: string;
}

export default function DropdownSelection(props: DropdownSelectionProps) {
  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className={`text-lightblack bg-lightgray1 focus:ring-2 focus:outline-none focus:ring-red font-medium rounded-lg text-sm px-20 py-2.5 text-start inline-flex items-center ${props.className}`}
        type="button">
        Selecione sua Instituição{' '}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownHover"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Fatec Ribeirão Preto
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
