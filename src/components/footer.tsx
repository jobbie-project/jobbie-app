export function Footer() {
  return (
    <>
      <div className="flex justify-center px-4 mb-2 bg-white">
        <div className="flex justify-between max-w-4xl w-full bg-red-300">
          <div className="text-sm">©Copyright Jobbie 2023. Alguns direitos reservados.</div>
          <div className="flex flex-row text-sm font-semibold">
            <div>Politica de privacidade</div>
            <span className="mx-4 border-l-2 bg-lightgray1"></span>
            <div>Termos & Condições</div>
            <div>Cookies</div>
          </div>
        </div>
      </div>
    </>
  );
}
