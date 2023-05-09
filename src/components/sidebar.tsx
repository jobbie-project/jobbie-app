export function Sidebar(props: { isOpen: boolean }) {
  return (
    <div
      className={`text-white absolute z-10 bg-[#931914] w-52 ${props.isOpen ? "left-[0px]" : "left-[-210px]"}  overflow-auto rounded-br-lg `}
      style={{
        transition: "left 1s",
      }}
    >
      <ul className="flex flex-col mt-4 font-medium">
        <li>
          <a className="block p-3">Inicio</a>
        </li>
        <li className="border-t-white border-t ">
          <a className="block p-3">Vagas</a>
        </li>
        <li className="border-t-white border-t">
          <a className="block p-3">Aplicações</a>
        </li>
        <li className="border-t-white border-t bo">
          <a className="block p-3">Perfil</a>
        </li>
      </ul>
    </div>
  );
}
