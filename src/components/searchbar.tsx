import { Search } from "@/icons/search";

export function SearchBar() {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <form className="flex items-center">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              className="bg-gray text-gray-900 focus:outline-n text-sm rounded-lg block w-full pl-16 p-4"
              placeholder="Procure por vagas, empresas"
            />
          </div>
          <button className="p-4 px-6 rounded-lg ml-4 text-sm font-medium text-white bg-blue">
            Pesquisar
          </button>
        </form>
      </div>
    </>
  );
}
