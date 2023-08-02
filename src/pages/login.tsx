import { Logoblack } from "@/icons/logo-black";
import React, { useState } from "react";
import { RouteButton } from "@/components/route-button";
import Link from "next/link";
import PasswordInput from "@/components/password";

export default function Login() {
  const [exibir, setExibir] = React.useState(true);
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container max-w-full mx-auto py-24 px-6">
        <div className="font-sans">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="mt-6">
                  <div className="mb-5 flex justify-center">
                    <Logoblack width={"100"} height={"50"} />
                  </div>
                  <div className="text-center font-regular text-black">
                    Continue com sua conta Jobbie.
                  </div>

                  <form className="mt-8" />
                  <div className="mx-auto max-w-lg">
                    <div className="py-2">
                      <input
                        placeholder="Email"
                        type="email"
                        className="text-md block px-3 py-2  w-full 
                bg-white border-b-2 border-b-gray3 focus:outline-none"
                      />
                    </div>
                    <div className="py-2" x-data="{ show: true }">
                      <PasswordInput setPassword={setPassword} />
                    </div>
                    <div className="flex justify-between mt-6">
                      <label className="block text-gray-500 font-regular my-2">
                        <input
                          type="checkbox"
                          className="accent-red peer relative left-0 h-4 w-4 shrink-0  rounded-sm border outline-none align-middle"
                        />
                        <span className="py-2 px-1 text-sm text-gray-600 leading-snug align-middle">
                          {" "}
                          Lembrar de mim{" "}
                        </span>
                      </label>
                      <label className="block text-gray-500 font-semibold my-2">
                        <a
                          href="#"
                          className="cursor-pointer tracking-tighter text-black"
                        >
                          <span className="text-black font-semibold ">
                            Esqueceu sua senha?
                          </span>
                        </a>
                      </label>
                    </div>
                    <div>
                      <RouteButton text="Entrar" link="/home-page" />
                      <span className="text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
                        Não possui conta?
                        <Link
                          className="ml-2 text-black font-semibold"
                          href="/register"
                        >
                          Cadastre-se
                        </Link>
                      </span>
                      <div className="text-sm text-warmGray-400 font-normal flex flex-row mt-8 justify-center text-center">
                        <span>
                          Ao continuar você concorda que declara que leu e
                          concorda com os{" "}
                          <a
                            className="text-black font-semibold inline-block"
                            href=""
                          >
                            Termos de Uso
                          </a>{" "}
                          e a{" "}
                          <a
                            className="text-black font-semibold inline-block"
                            href=""
                          >
                            Politica de Privacidade
                          </a>
                          .
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
