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
import StudentRegisterStep2 from './pages/profile/student/student-profile-step2';
import StudentRegisterStep3 from './pages/profile/student/student-profile-step3';
import ForgetPassword from './pages/password-reset/forget-password';
import EmailVerification from './pages/password-reset/email-verification';
import ChangePassword from './pages/password-reset/change-password';
import PasswordChanged from './pages/password-reset/password-changed';
import StudentRegisterStep4 from './pages/profile/student/student-profile-step4';
import AddNewEducation from './pages/profile/student/update-profile/student-education-new';
import StudentRegisterStep5 from './pages/profile/student/student-profile-step5';
import StudentRegisterStep6 from './pages/profile/student/student-profile-step6';
import AddNewExperience from './pages/profile/student/update-profile/student-experience-new';
import StudentRegisterStep7 from './pages/profile/student/student-profile-step7';
import StudentProfileReview from './pages/profile/student/student-profile-review';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* Home Redirect */}
        <Route>
          <Route path={`/inicio`} element={<Home />} />
        </Route>

        {/* Public routes */}
        <Route path={`/entrar`} element={<Login />} />
        <Route path={`/registro`} element={<Register />} />
        <Route path={`/registro/estudante`} element={<StudentRegister />} />
        <Route path={`/registro/empresa`} element={<CompanyRegister />} />
        <Route path={`/verificacao-de-email`} element={<VerifyEmail />} />
        <Route path={`/email-verificado`} element={<VerifiedEmail />} />
        <Route path={`/recuperacao-de-conta`} element={<ForgetPassword />} />
        <Route path={`/recuperacao-de-conta/verificacao-de-email`} element={<EmailVerification />} />
        <Route path={`/redefinicao-de-senha`} element={<ChangePassword />} />
        <Route path={`/recuperacao-de-conta/senha-alterada`} element={<PasswordChanged />} />
        <Route path={`/registro/estudante/passo-1`} element={<StudentRegisterStep1 />} />
        <Route path={`/registro/estudante/passo-2`} element={<StudentRegisterStep2 />} />
        <Route path={`/registro/estudante/passo-3`} element={<StudentRegisterStep3 />} />
        <Route path={`/registro/estudante/passo-4`} element={<StudentRegisterStep4 />} />
        <Route path={`/registro/estudante/passo-5`} element={<StudentRegisterStep5 />} />
        <Route path={`/registro/estudante/passo-6`} element={<StudentRegisterStep6 />} />
        <Route path={`/registro/estudante/passo-7`} element={<StudentRegisterStep7 />} />
        <Route path={`/estudante/educacao/adicionar`} element={<AddNewEducation />} />
        <Route path={`/estudante/experiencia/adicionar`} element={<AddNewExperience />} />
        <Route path={`/estudante/educacao/editar`} element={<AddNewEducation />} />
        <Route path={`/estudante/perfil/revisar`} element={<StudentProfileReview />} />
      </Routes>
      <ToastContainer />
    </>
  );
};
