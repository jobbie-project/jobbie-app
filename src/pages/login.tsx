import { Logoblack } from "@/icons/logo-black";
import React from "react";

export default function Login() {
  return (
    <>
      <div className="mt-12 flex justify-center self-center  z-10">
        <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
          <div className="mb-7">
            <div className="flex justify-center self-center">
              <Logoblack />
            </div>

            <p className="text-black text-center">
              Continue com sua conta Jobbie.
            </p>
          </div>
          <div className="space-y-6">
            <div className="">
              <input
                className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                type=""
                placeholder="Insira seu Email"
              />
            </div>

            <div className="relative" x-data="{ show: true }">
              <input
                placeholder="Insira sua senha"
                className="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
              />
              <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                <svg
                  className="h-4 text-purple-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>

                <svg
                  className="h-4 text-purple-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm ml-auto">
                <a href="#" className="text-black">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div></div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center bg-blue text-white p-3  rounded-lg tracking-wide font-regular  cursor-pointer transition ease-in duration-500"
          >
            Entrar
          </button>
          <div className="mt-7">
            <p className="text-black text-center">
              Não possui conta?{" "}
              <a href="#" className="text-sm text-black  font-semibold">
                Cadastre-se
              </a>
            </p>
          </div>
          <div className="mt-7 text-center text-gray-300 text-xs">
            <span>
              Ao continuar você concorda que declara que leu e concorda com os
              <a href="/" className="font-semibold">
                {" "}
                Termos de Uso
              </a>{" "}
              e a{" "}
              <a href="/" className="font-semibold">
                {" "}
                Politica de Privacidade.{" "}
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
