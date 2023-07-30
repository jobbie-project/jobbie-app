import React from "react";
import RegisterHeader from "@/components/register-header";
import { Logoblack } from "@/icons/logo-black";

export default function SelecaoUsuario() {
  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen ">
        <span className="max-w-lg w-full font-semibold text-xl text-black">
          Boas vindas.
        </span>
        <span className="max-w-lg w-full font-normal text-base text-black mt-6">
          Tudo pronto para dar o próximo passo?
        </span>
        <div className="inline-block mt-8">
          <input
            className="appearance-none border rounded-full p-1 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-red-300 checked:bg-red"
            type="radio"
            name="radio"
            id="candidato"
            value="candidato"
          />
          <label
            className="ml-2 text-black font-semibold text-lg"
            htmlFor="candidato"
          >
            Candidato
          </label>
        </div>
        <div className="inline-block mt-2 ">
          <input
            className="appearance-none border rounded-full p-1 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-green-300 checked:bg-red"
            type="radio"
            name="radio"
            id="empresa"
            value="empresa"
          />
          <label
            className="ml-2 text-black font-semibold text-lg"
            htmlFor="empresa"
          >
            Empresa
          </label>
        </div>
      </div>
    </>
  );
}
