export function SelectCountry() {
  return (
    <div className="mt-8 w-full">
      <div className="font-semibold select-none">País</div>
      <div className="flex flex-row justify-between mb-6">
        <span className="select-none text-base text-lightblack">Brasil</span>
        <div className="text-sm relative text-gray-400 select-none cursor-pointer">Alterar</div>
      </div>
    </div>
  );
}
