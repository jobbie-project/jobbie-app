import {FilterIcon} from '@/icons/filter';
import {CiSearch} from 'react-icons/ci';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showFilter?: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

export function SearchBar(props: SearchBarProps) {
  return (
    <>
      <div className={`w-full ${props.className}`}>
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="bg-lightgray1 rounded-md flex flex-row h-12">
              <div className="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
                <CiSearch size="30" color={'#7C7979'} />
              </div>
              <input
                value={props.value}
                type="text"
                className="bg-lightgray1 text-gray-900 focus:outline-none text-sm rounded-md block w-full pl-16 placeholder-[#7C7979]"
                placeholder={props.placeholder ? props.placeholder : 'Pesquisar'}
                onChange={event => props.onChange && props.onChange(event.target.value)}
              />
              {props.showFilter && (
                <div className="flex flex-row items-center mr-4">
                  <FilterIcon width="30" height="30" />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
