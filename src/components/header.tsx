import React from 'react';
import {Logoblack} from '@/icons/logo-black';
import {RiMenuLine} from 'react-icons/ri';
import {useWindowSize} from '@/hooks/useWindowSize';
import {Sidebar} from './sidebar';
import {Button} from '@/components/ui/button';
import {IoIosNotificationsOutline} from 'react-icons/io';
import {SettingsMenu} from './settings';
import {useNavigate} from 'react-router-dom';

export function Header() {
  const window = useWindowSize();
  const isMobile = window.width < 768;
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center px-4 w-full mb-2 bg-lightgray1">
        <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'}  w-[1200px]`}>
          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="absolute py-3 left-5">
              <RiMenuLine size="30" />
            </button>
          )}
          <div className="py-2 px-6">
            <a href="/inicio">
              <Logoblack width={isMobile ? '80' : '100'} height={isMobile ? '40' : '50'} />
            </a>
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <div className="flex items-center justify-between w-full ">
                <div
                  onClick={() => {
                    navigate('/inicio');
                  }}
                  className="block py-2 pr-4 pl-3 font-medium text-black cursor-pointer">
                  Inicio
                </div>
                <div
                  onClick={() => {
                    navigate('/vaga/pesquisar');
                  }}
                  className="block py-2 pr-4 pl-3 font-medium text-black cursor-pointer">
                  Pesquisar Vagas
                </div>
                <div
                  onClick={() => {
                    navigate('/aplicacoes');
                  }}
                  className="block py-2 pr-4 pl-3 font-medium text-black cursor-pointer">
                  Minhas aplicações
                </div>
                <div
                  onClick={() => {
                    navigate('/sobre');
                  }}
                  className="block py-2 pr-4 pl-3 font-medium text-black cursor-pointer">
                  Sobre
                </div>
              </div>
            </div>
          )}

          <div className={`py-4 flex ${isMobile && 'absolute right-5'}`}>
            <a className="px-4" href="#">
              <Button variant="none" className="border-none hover:none">
                <IoIosNotificationsOutline size="30" />
              </Button>
            </a>
            <a href="#">
              <SettingsMenu />
            </a>
          </div>
        </div>
      </div>

      {isMobile && <Sidebar isOpen={isOpen} />}
    </>
  );
}
