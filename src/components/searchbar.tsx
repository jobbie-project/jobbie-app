import {Filter} from '@/icons/filter';
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
            <div className="bg-lightgray1 rounded-lg flex flex-row h-12">
              <div className="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
                <CiSearch size="30" color={'#BDBDBD'} />
              </div>
              <input
                type="text"
                className="bg-lightgray1 text-gray-900 focus:outline-none text-sm rounded-lg block w-full pl-16 placeholder-[#BDBDBD]"
                placeholder={props.placeholder ? props.placeholder : 'Pesquisar'}
              />
              {props.showFilter && (
                <div className="flex flex-row items-center mr-4">
                  <Filter width="30" height="30" />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
