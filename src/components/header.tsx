import React from "react";
import { Logo } from "@/icons/logo";
import { Menu } from "@/icons/menu";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Sidebar } from "./sidebar";
import { Settings } from "@/icons/settings";
import { Notifications } from "@/icons/notifications";

export function Header() {
  const window = useWindowSize();
  const isMobile = window.width < 768;
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <header>
        <nav>
          <div className="flex justify-center px-4 py-2 w-full bg-red">
            <div
              className={`flex ${
                isMobile ? "justify-center" : "justify-between"
              }  w-[1200px]`}
            >
              {isMobile && (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="absolute py-3 left-5"
                >
                  <Menu />
                </button>
              )}
              <div className="py-2">
                <Logo
                  width={isMobile ? "80" : "100"}
                  height={isMobile ? "40" : "50"}
                />
              </div>
              {!isMobile && (
                <div className="flex items-center">
                  <div className="flex items-center justify-between w-full ">
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 font-medium text-white"
                      aria-current="page"
                    >
                      Inicio
                    </a>
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 font-medium text-white"
                      aria-current="page"
                    >
                      Pesquisar Vagas
                    </a>
                    <a
                      href="#"
                      className="block py-2 pr-4 pl-3 font-medium text-white"
                      aria-current="page"
                    >
                      Sou Empresa
                    </a>
                  </div>
                </div>
              )}

              <div className={`py-4 flex ${isMobile && "absolute right-5"}`}>
                <a className="px-4" href="#">
                  <Notifications />
                </a>
                <a href="#">
                  <Settings />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isMobile && <Sidebar isOpen={isOpen} />}
    </>
  );
}
