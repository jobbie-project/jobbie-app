import PasswordInput from "@/components/password";
import PasswordStrengthMeter from "@/components/password-strength-meter";
import RegisterHeader from "@/components/register-header";
import { RouteButton } from "@/components/route-button";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-8">
        <div className="max-w-xs w-full">
          <p className="text-black font-semibold text-xl mt-20">
            Recuperação de senha
          </p>
          <p className="mt-8">
            Forneça o email utilizado para realizar login no Portal.
          </p>
        </div>
        <form action="" className="w-full max-w-[336px]">
          <div className="mt-12 w-full">
            <input
              required
              placeholder="Email"
              type="email"
              className="text-md block px-3 py-2 max-w-[336px] w-full
                border-b-2 border-b-gray3 focus:outline-none bg-white"
            />
          </div>
          <div className="mt-[30px]">
            {" "}
            <RouteButton
              type="submit"
              text="Continuar"
              link={`${router.asPath}/verify-email`}
            />
          </div>
        </form>
      </div>
    </div>
  );
}