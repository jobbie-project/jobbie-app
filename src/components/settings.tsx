import {Cloud, LifeBuoy, LogOut, Settings, User} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useNavigate} from 'react-router-dom';
import authenticationService from '@/services/authentication/authentication.service';
import {toast} from 'react-toastify';
import {SettingsIcon} from '@/icons/settings';
import {UserRole} from '@/enums';

export function SettingsMenu() {
  const navigate = useNavigate();
  const userData = authenticationService.getUserData();

  const onClick = () => {
    navigate('/entrar');
    authenticationService.logout();
  };

  const notAdded = () => {
    toast.error('Oops! Funcionalidade ainda não implementada.', {
      icon: '🥺',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="none" className="display:block">
          <SettingsIcon width="26" height="26" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sua Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userData.role === UserRole.STUDENT ? (
          <DropdownMenuItem onClick={() => navigate('/perfil/editar')}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={notAdded}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={notAdded}>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Suporte</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClick}>
          <div className="flex flex-row items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
