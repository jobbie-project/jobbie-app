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
import StudentRegisterStep7 from './pages/profile/student/student-profile-step7';
import StudentProfileReview from './pages/profile/student/student-profile-review';
import JobManagement from './pages/admin-management/job-management';
import CreateJobStep1 from './pages/jobs/create-job-step-1';
import CreateJobStep2 from './pages/jobs/create-job-step-2';
import CreateJobStep3 from './pages/jobs/create-job-step-3';
import JobReview from './pages/jobs/job-review';
import JobViewer from './pages/jobs/job-viewer';
import JobSearch from './pages/jobs/job-search';
import NotFound from './pages/notfound';
import Profile from './pages/profile/student/profile';
import UpdateJobStep1 from './pages/jobs/update-job/update-job-step-1';
import UpdateJobStep2 from './pages/jobs/update-job/update-job-step-2';
import UpdateJobStep3 from './pages/jobs/update-job/update-job-step-3';
import UpdateJobReview from './pages/jobs/update-job/update-job-review';
import AddNewExperience from './pages/profile/student/update-profile/student-experience-new';
import {useEffect} from 'react';
import {useAppDispatch} from './store/store';
import {setFatecCourse, setFatecInstitutions} from './store/slices/fatec-data';
import {toastError} from './utils/toast-error';
import Api from './services/api/api.service';
import ApplicantsManagement from './pages/admin-management/applicants-management';
import MyApplications from './pages/my-applications';
import NotDesktop from './pages/notdesktop';
import AboutUs from './pages/about-us';

const RedirectToLogin: React.FC = () => {
  window.location.href = '/inicio';
  return <></>;
};

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchFatecData = async () => {
    try {
      const fatecInstitutions = await Api.get('/fatec/institutions');
      const fatecCourses = await Api.get('/fatec/courses');
      dispatch(setFatecCourse(fatecCourses.data));
      dispatch(setFatecInstitutions(fatecInstitutions.data));
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    fetchFatecData();
  }, []);

  return (
    <div className="h-[100vh]">
      <Routes>
        {/* Home Redirect */}
        <Route>
          <Route path="/*" element={<RedirectToLogin />} />
        </Route>

        {/* Public routes */}
        <Route path={`/entrar`} element={<Login />} />
        <Route path={`/inicio`} element={<Home />} />
        <Route path={`/sobre`} element={<AboutUs />} />
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

        <Route path="/perfil/editar" element={<Profile />} />
        <Route path="/perfil/editar/passo-1" element={<StudentRegisterStep1 />} />
        <Route path="/perfil/editar/passo-2" element={<StudentRegisterStep2 />} />
        <Route path="/perfil/editar/passo-3" element={<StudentRegisterStep3 />} />
        <Route path="/perfil/editar/passo-5" element={<AddNewExperience />} />

        <Route path={`/estudante/certificações/adicionar`} element={<StudentRegisterStep7 />} />
        <Route path={`/estudante/educacao/adicionar`} element={<AddNewEducation />} />
        <Route path={`/estudante/experiencia/adicionar`} element={<AddNewExperience />} />
        <Route path={`/estudante/educacao/editar`} element={<AddNewEducation />} />
        <Route path={`/estudante/experiencia`} element={<AddNewExperience />} />
        <Route path={`/estudante/perfil/revisar`} element={<StudentProfileReview />} />
        <Route path={`/gerenciamento`} element={<JobManagement />} />
        <Route path={`/gerenciamento/candidatos`} element={<ApplicantsManagement />} />

        <Route path={`/nova-vaga/passo-1`} element={<CreateJobStep1 />} />
        <Route path={`/nova-vaga/passo-1/editar`} element={<CreateJobStep1 />} />
        <Route path={`/nova-vaga/passo-2`} element={<CreateJobStep2 />} />
        <Route path={`/nova-vaga/passo-2/editar`} element={<CreateJobStep2 />} />
        <Route path={`/nova-vaga/passo-3`} element={<CreateJobStep3 />} />
        <Route path={`/nova-vaga/passo-3/editar`} element={<CreateJobStep3 />} />
        <Route path={`/nova-vaga/revisar`} element={<JobReview />} />

        <Route path={`/vaga/detalhes`} element={<JobViewer />} />
        <Route path={`/vaga/editar/passo-1`} element={<UpdateJobStep1 />} />
        <Route path={`/vaga/editar/passo-2`} element={<UpdateJobStep2 />} />
        <Route path={`/vaga/editar/passo-3`} element={<UpdateJobStep3 />} />
        <Route path={`/vaga/editar`} element={<UpdateJobReview />} />
        <Route path={`/vaga/pesquisar`} element={<JobSearch />} />

        <Route path={`/candidaturas`} element={<MyApplications />} />
        <Route path={`/404`} element={<NotFound />} />
        <Route path={`/notdesktop`} element={<NotDesktop />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};
