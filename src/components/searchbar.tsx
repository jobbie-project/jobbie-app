import {BiFilterAlt} from 'react-icons/bi';
import {CiSearch} from 'react-icons/ci';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showFilter?: boolean;
}

export function SearchBar(props: SearchBarProps) {
  return (
    <>
      <div className={`w-full ${props.className}`}>
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
              <CiSearch size="22" />
            </div>
            <input
              type="text"
              className="bg-lightgray1 text-gray-900 focus:outline-none text-sm rounded-lg block w-full pl-16 p-4"
              placeholder={props.placeholder ? props.placeholder : 'Pesquisar'}
            />
          </div>
          {props.showFilter && (
            <button className="p-3 rounded-lg ml-4 text-sm font-medium text-redDefault">
              <BiFilterAlt size="22" />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
