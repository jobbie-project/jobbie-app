import React from 'react';
import {Logoblack} from '@/icons/logo-black';
import {RiMenuLine} from 'react-icons/ri';
import {useWindowSize} from '@/hooks/useWindowSize';
import {Sidebar} from './sidebar';
import {CiSettings} from 'react-icons/ci';
import {IoIosNotificationsOutline} from 'react-icons/io';

export function Header() {
  const window = useWindowSize();
  const isMobile = window.width < 768;
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="absolute flex justify-center px-4 py-2 w-full bg-lightgray1">
        <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'}  w-[1200px]`}>
          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="absolute py-3 left-5">
              <RiMenuLine size="30" />
            </button>
          )}
          <div className="py-2 px-6">
            <a href="">
              <Logoblack width={isMobile ? '80' : '100'} height={isMobile ? '40' : '50'} />
            </a>
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <div className="flex items-center justify-between w-full ">
                <a href="" className="block py-2 pr-4 pl-3 font-medium text-black" aria-current="page">
                  Inicio
                </a>
                <a href="#" className="block py-2 pr-4 pl-3 font-medium text-black" aria-current="page">
                  Pesquisar Vagas
                </a>
                <a href="#" className="block py-2 pr-4 pl-3 font-medium text-black" aria-current="page">
                  Sou Empresa
                </a>
              </div>
            </div>
          )}

          <div className={`py-4 flex ${isMobile && 'absolute right-5'}`}>
            <a className="px-4" href="#">
              <IoIosNotificationsOutline size="30" />
            </a>
            <a href="#">
              <CiSettings size="30" />
            </a>
          </div>
        </div>
      </div>

      {isMobile && <Sidebar isOpen={isOpen} />}
    </>
  );
}
