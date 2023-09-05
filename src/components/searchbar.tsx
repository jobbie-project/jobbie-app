import {BiFilterAlt} from 'react-icons/bi';
import {CiSearch} from 'react-icons/ci';

export function SearchBar() {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
              <CiSearch size="22" />
            </div>
            <input
              type="text"
              className="bg-gray text-gray-900 focus:outline-none text-sm rounded-lg block w-full pl-16 p-4"
              placeholder="Procure por vagas, empresas"
            />
          </div>
          <button className="p-3 rounded-lg ml-4 text-sm font-medium text-white redDefault">
            <BiFilterAlt size="22" />
          </button>
        </form>
      </div>
    </>
  );
}
