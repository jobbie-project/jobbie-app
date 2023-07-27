import { Logoblack } from "@/icons/logo-black";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";

export default function Login() {
  const [exibir, setExibir] = React.useState(false);

  return (
    <>
      <div className="container max-w-full mx-auto py-24 px-6">
        <div className="font-sans">
          <div className="max-w-sm mx-auto px-6">
            <div className="relative flex flex-wrap">
              <div className="w-full relative">
                <div className="mt-6">
                  <div className="mb-5 flex justify-center">
                    <Logoblack />
                  </div>
                  <div className="text-center font-regular text-black">
                    Continue com sua conta Jobbie.
                  </div>

                  <form className="mt-8" />
                  <div className="mx-auto max-w-lg">
                    <div className="py-2">
                      <input
                        placeholder="Email"
                        type="text"
                        className="text-md block px-3 py-2  w-full 
                bg-white border-b-2 border-b-gray3 focus:outline-none"
                      />
                    </div>
                    <div className="py-2" x-data="{ show: true }">
                      <div className="relative border-b-2 border-b-gray3  flex flex-row items-center">
                        <input
                          placeholder="Senha"
                          className="text-md block px-3 py-2  w-full 
                focus:outline-none"
                        />

                        <div onClick={() => setExibir(!exibir)}>
                          {exibir ? (
                            <AiOutlineEye size={22} />
                          ) : (
                            <AiOutlineEyeInvisible size={22} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex p-3 justify-between">
                      <label className="block text-gray-500 font-regular my-2">
                        <input
                          type="checkbox"
                          className="appearence-none w-3.5 h-3.5 rounded-sm focus:outline-none checked:bg-green-300 checked:border-green-300"
                        />{" "}
                        <span className="py-2 text-sm text-gray-600 leading-snug">
                          {" "}
                          Lembrar de mim{" "}
                        </span>
                      </label>
                      <label className="block text-gray-500 font-semibold my-2">
                        <a
                          href="#"
                          className="cursor-pointer tracking-tighter text-black"
                        >
                          <span className="text-green font-normal ">
                            Esqueceu sua senha?
                          </span>
                        </a>
                      </label>
                    </div>{" "}
                    <button className="mt-8 text-lg bg-red font-normal w-full text-white rounded px-3 py-3 block shadow-xl">
                      Login
                    </button>
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
