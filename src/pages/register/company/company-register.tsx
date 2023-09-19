import RegisterHeader from '@/components/register-header';

export default function CompanyRegister() {
  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col  mt-6">
        <div className="max-w-xl w-full">
          <p className="text-black font-semibold text-lg">Criar uma conta</p>
          <p className="mt-6">Preencha com as informações que deseja utilizar para realizar login no portal.</p>
        </div>
      </div>
    </div>
  );
}
