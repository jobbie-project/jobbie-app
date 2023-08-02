import PasswordInput from "@/components/password";
import PasswordStrengthMeter from "@/components/password-strength-meter";
import RegisterHeader from "@/components/register-header";
import { RouteButton } from "@/components/route-button";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CreateAccount() {
  const [password, setPassword] = useState("");
  const router = useRouter();

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
        <form action="" className="w-full max-w-[336px]">
          <div className="mt-8 w-full">
            <input
              placeholder="Nome"
              type="string"
              className="text-md block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray3 focus:outline-none bg-white"
            />
            <div className="mt-4 w-full">
              <input
                placeholder="Email Institucional"
                type="email"
                className="text-md block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray3 focus:outline-none bg-white"
              />
            </div>
            <div className="py-2 w-full">
              <PasswordInput setPassword={setPassword} />
              <PasswordStrengthMeter password={password} />
            </div>
          </div>
          <div className="mt-2">
            {" "}
            <RouteButton
              text="Continuar"
              link={`${router.asPath}/verify-email`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
