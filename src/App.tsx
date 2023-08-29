import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/homepage";
import Register from "./pages/register/register";
import StudentRegister from "./pages/register/student/student-register";

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
        {/* <Route path={`/registro/estudante`} element={<StudentRegister />} /> */}
      </Routes>
    </>
  );
};