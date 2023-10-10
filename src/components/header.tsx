import React from 'react';
import {Logoblack} from '@/icons/logo-black';
import {RiMenuLine} from 'react-icons/ri';
import {useWindowSize} from '@/hooks/useWindowSize';
import {Sidebar} from './sidebar';
import {useNavigate} from 'react-router-dom';
import {NotificationIcon} from '@/icons/notifications';
import {SettingsMenu} from './settings';
import authenticationService from '@/services/authentication/authentication.service';
import {UserRole} from '@/enums';
import {toast} from 'react-toastify';

export function Header() {
  const window = useWindowSize();
  const isMobile = window.width < 768;
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const userData = authenticationService.getUserData();
  const notAdded = () => {
    toast('Oops! Funcionalidade ainda não implementada.', {
      icon: '🥺',
      theme: 'colored',
    });
  };

  return (
    <>
      <div className="flex justify-center px-4 w-full mb-2 bg-lightgray1">
        <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'}  w-[1200px]`}>
          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="absolute left-5">
              <RiMenuLine size="30" />
            </button>
          )}
          <div className="px-6 flex items-center">
            <a href="/inicio">
              <Logoblack width={isMobile ? '40' : '80'} height={isMobile ? '30' : '60'} />
            </a>
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <div className="flex items-center justify-between w-full text-sm">
                <div
                  onClick={() => {
                    navigate('/inicio');
                  }}
                  className="block pr-4 pl-3 font-medium text-black cursor-pointer">
                  Inicio
                </div>
                <div
                  onClick={() => {
                    navigate('/vaga/pesquisar');
                  }}
                  className="block pr-4 pl-3 font-medium text-black cursor-pointer">
                  Pesquisar Vagas
                </div>
                {userData.role === UserRole.ADMIN ? (
                  <div
                    onClick={() => {
                      navigate('/gerenciamento');
                    }}
                    className="block pr-4 pl-3 font-medium text-black cursor-pointer">
                    Gerenciar
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      navigate('/aplicacoes');
                    }}
                    className="block pr-4 pl-3 font-medium text-black cursor-pointer">
                    Minhas aplicações
                  </div>
                )}
                <div
                  onClick={() => {
                    navigate('/sobre');
                  }}
                  className="block pr-4 pl-3 font-medium text-black cursor-pointer">
                  Sobre
                </div>
              </div>
            </div>
          )}

          <div className={`p-2 flex items-center ${isMobile && 'absolute right-5'}`}>
            <div onClick={notAdded} className="px-4 cursor-pointer">
              <NotificationIcon width="24" height="24" />
            </div>
            <SettingsMenu />
          </div>
        </div>
      </div>

      {isMobile && <Sidebar isOpen={isOpen} />}
    </>
  );
}
