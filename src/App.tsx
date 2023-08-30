import {Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/homepage';
import Register from './pages/register/register';
import StudentRegister from './pages/register/student/student-register';
import CompanyRegister from './pages/register/company/company-register';
import VerifyEmail from './pages/register/verify-email';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import VerifiedEmail from './pages/register/verified-email';
import StudentRegisterStep1 from './pages/profile/student/student-profile-step1';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Home Redirect */}
        <Route
        // element={<ProtectedRoute allowedRoles={[UserRole.ACCOUNT_ADMIN, UserRole.ACCOUNT_ADMIN, UserRole.ADMIN]} />}
        >
          <Route path={`/home`} element={<Home />} />
        </Route>

        {/*  Private Routes routes
        <Route element={<BaseLayout />}>
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ACCOUNT_ADMIN]} />}>
            <Route path={`/contas-bancarias`} element={<BankAccountsPage />} />
          </Route>
        </Route>*/}

        {/* Public routes */}
        <Route path={`/login`} element={<Login />} />
        <Route path={`/registro`} element={<Register />} />
        <Route path={`/registro/estudante`} element={<StudentRegister />} />
        <Route path={`/registro/empresa`} element={<CompanyRegister />} />
        <Route path={`/verifica-email`} element={<VerifyEmail />} />
        <Route path={`/email-verificado`} element={<VerifiedEmail />} />
        <Route path={`/registro/estudante/passo-1`} element={<StudentRegisterStep1 />} />
      </Routes>
      <ToastContainer />
    </>
  );
};
