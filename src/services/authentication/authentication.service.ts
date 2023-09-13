class AuthService {
  authenticate = (id: string, token: string, name: string, role: string): void => {
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);
    window.dispatchEvent(new Event('storage'));
  };
}

export default new AuthService();
