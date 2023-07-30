import RegisterHeader from "@/components/register-header";
import React from "react";

export default function CreateAccount() {
  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-sm w-full">
          <p className="text-black font-semibold text-xl">Criar uma conta</p>
          <p className="mt-6">
            Preencha com as informações que deseja utilizar para realizar login
            no portal.
          </p>
        </div>
      </div>
    </div>
  );
}
