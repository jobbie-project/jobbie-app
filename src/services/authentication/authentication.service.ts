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

  getUserData = () => {
    return {
      id: localStorage.getItem('user_id'),
      token: localStorage.getItem('user_token'),
      name: localStorage.getItem('user_name'),
      role: localStorage.getItem('user_role'),
      profile_completed: localStorage.getItem('user_profile_completed') === 'true',
    };
  };
}

export default new AuthService();
