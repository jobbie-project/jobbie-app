import {UserRole} from '@/enums';
import {NavigateFunction} from 'react-router-dom';

interface UserAuthenticated {
  id: string;
  token: string;
  name: string;
  role: string;
  profile_completed: boolean;
}

class AuthService {
  authenticate = (id: string, token: string, name: string, role: string, profile_completed: boolean): void => {
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_profile_completed', profile_completed.toString());
    window.dispatchEvent(new Event('storage'));
  };

  logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    window.dispatchEvent(new Event('storage'));
  };

  getUserData = (): UserAuthenticated => {
    return {
      id: localStorage.getItem('user_id'),
      token: localStorage.getItem('user_token'),
      name: localStorage.getItem('user_name'),
      role: localStorage.getItem('user_role'),
      profile_completed: localStorage.getItem('user_profile_completed') === 'true',
    } as UserAuthenticated;
  };
  handleRedirect = (user: UserAuthenticated, navigator: NavigateFunction) => {
    if (user.role === UserRole.STUDENT) {
      user.profile_completed ? navigator('/inicio') : navigator('/registro/estudante/passo-1');
    }
    if (user.role === UserRole.ADMIN) {
      navigator('/gerenciamento');
    }
  };
}

export default new AuthService();
