import { Logoblack } from "@/icons/logo-black";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";
import Link from "next/link";

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
                    <div className="flex  justify-between">
                      <label className="block text-gray-500 font-regular my-2">
                        <input
                          type="checkbox"
                          className="peer relative left-0 h-4 w-4 shrink-0  appearance-none rounded-sm border outline-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:30px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-red hover:ring hover:ring-gray"
                        />{" "}
                        <span className="py-2 px-2 text-sm text-gray-600 leading-snug">
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
                    <div>
                      <Link href="/home-page">
                        <a>
                          <button className="mt-8 text-lg bg-red font-normal w-full text-white rounded px-3 py-3 block shadow-xl">
                            Login
                          </button>
                        </a>
                      </Link>
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
