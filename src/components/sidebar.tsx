export function Sidebar(props: { isOpen: boolean }) {
  return (
    <div
      style={{
        zIndex: 4,
        backgroundColor: "white",
        minWidth: "200px",
        position: "absolute",
        left: `${props.isOpen ? "0px" : "-200px"}`,
        transition: "left 1s",
        overflow: "auto",
        minHeight: "90%",
      }}
    >
      <ul className="flex flex-col mt-4 font-medium">
        <li>
          <a className="block p-3">Inicio</a>
        </li>
        <li>
          <a className="block p-3">Vagas</a>
        </li>
        <li>
          <a className="block p-3">Aplicações</a>
        </li>
        <li>
          <a className="block p-3">Perfil</a>
        </li>
      </ul>
    </div>
  );
}
