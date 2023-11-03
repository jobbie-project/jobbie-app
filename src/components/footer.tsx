import {CpsIcon} from '@/icons/cps-logo';
import {FatecIcon} from '@/icons/fatec-logo';
import {SpIcon} from '@/icons/sp-icon';

export function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 bottom-0 bg-lightgray1 w-full">
        <div className="flex flex-row justify-between max-w-4xl py-2 w-full">
          <div className="text-xs p-2">©Copyright Jobbie 2023. Alguns direitos reservados.</div>
          <div className="flex flex-row text-sm font-semibold">
            <div className="p-2 text-xs">Politica de privacidade</div>
            <span className="mx-4 border-l-2 border-l-lightgray2"></span>
            <div className="p-2 text-xs">Termos & Condições</div>
            <span className="mx-4 border-l-2 border-l-lightgray2"></span>
            <div className="p-2 text-xs">Cookies</div>
          </div>
        </div>
        <div className="flex flex-col max-w-4xl w-full ">
          <div className="m-2 flex flex-row justify-between">
            <a href="http://www.fatecrp.edu.br/" target="_blank">
              <FatecIcon width="100" height="80" />
            </a>
            <a href="https://www.cps.sp.gov.br/" target="_blank">
              <CpsIcon width="80" height="80" />
            </a>
          </div>
          <p className="text-xs mt-2 mb-6 text-lightblack2 flex justify-end">
            Desenvolvido por:{' '}
            <a
              href="https://www.linkedin.com/in/adriellyisly/"
              target="_blank"
              className="font-semibold cursor-pointer mx-1">
              Adrielly Isly
            </a>
            e
            <a
              href="https://www.linkedin.com/in/felipe-gabriel-botelho/"
              target="_blank"
              className="font-semibold cursor-pointer ml-1 ">
              Felipe Botelho
            </a>
            , com Orientação do Docente
            <a
              href="http://lattes.cnpq.br/7498826465229905"
              target="_blank"
              className="font-semibold cursor-pointer ml-1">
              Fabrício Gustavo Henrique.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
