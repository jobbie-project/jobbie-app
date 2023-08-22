import React from "react";
import RegisterHeader from "@/components/register-header";
import { RouteButton } from "@/components/route-button";
import router from "next/router";

export default function SelecaoUsuario() {
  const [userType, setUserType] = React.useState<"student" | "company">();

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen px-6">
        <div className="max-w-xs w-full font-normal text-base text-black">
          <div className=" mt-24 w-full font-semibold text-xl text-black">
            Boas vindas.
          </div>
          <p className="mt-6">Tudo pronto para dar o próximo passo?</p>

          <div className="inline-block mt-16 w-full max-w-lg">
            <input
              onChange={() => setUserType("student")}
              type="radio"
              name="radio"
              id="candidato"
              value="candidato"
              className="accent-red h-4 w-4 rounded-full border-gray-300"
            />
            <label
              className="ml-2 text-black font-semibold text-lg"
              htmlFor="candidato"
            >
              Candidato
            </label>
          </div>

          <div className="inline-block mt-8 w-full max-w-lg">
            <input
              className="accent-red h-4 w-4 rounded-full border-gray-300"
              onChange={() => setUserType("company")}
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

        <div className="mt-4 w-[336px]">
          <RouteButton
            text="Continuar"
            link={
              userType === "student"
                ? `${router.asPath}/student`
                : `${router.asPath}/company`
            }
          />
        </div>
      </div>
    </>
  );
}
