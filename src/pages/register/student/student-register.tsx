import {GeneralButton} from '@/components/general-button';
import GeneralInput from '@/components/general-input';
import PasswordInput from '@/components/password';
import PasswordStrengthMeter from '@/components/password-strength-meter';
import RegisterHeader from '@/components/register-header';
import {UserRole} from '@/enums';
import Api from '@/services/api/api.service';
import {toastError} from '@/utils/toast-error';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function StudentRegister() {
  const {register, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  const [isOpenTermsOfUse, setIsOpenTermsOfUse] = useState(false);
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
  const validate = (email: string) => {
    return email.split('@')[1] === 'fatec.sp.gov.br' ? true : false;
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.name) throw new Error('Insira um nome válido');
      if (!validate(data.email)) throw new Error('Utilize um email institucional da Fatec');
      if (!isPasswordValid) throw new Error('Senha muito fraca');
      await Api.post('/user/create', {...data, role: UserRole.STUDENT});
      navigate('/verificacao-de-email?email=' + data.email);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col  mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <div className="max-w-md w-full">
            <p className="text-black font-semibold text-lg mt-8 select-none">Criar uma conta</p>
            <p className="mt-6 text-sm">
              Preencha com as informações que deseja utilizar para realizar login no portal.
            </p>
          </div>
          <div className="mt-6 w-full text-sm">
            <GeneralInput register={register} registerName="name" label="Nome completo" />
            <GeneralInput register={register} registerName="email" label="Email Institucional" />
            <div className="py-2 w-full text-sm">
              <PasswordInput text="Senha" register={register} registerName="password" />
              <PasswordStrengthMeter
                password={watch('password')}
                onChange={(isValid: boolean) => isValid !== isPasswordValid && setIsPasswordValid(isValid)}
              />
              <div className="mt-4 text-xs text-gray3">
                Senhas devem ter pelo menos: 6 caracteres com combinações de letras e números.
              </div>
            </div>
          </div>
          <div className="mt-2">
            <GeneralButton text={'Continuar'} type={'submit'} />
          </div>
        </form>
        <div className="text-xs text-warmGray-400 font-normal flex flex-row mt-8 justify-center text-center max-w-sm">
          <span>
            Ao continuar você concorda que declara que leu e concorda com os{' '}
            <div
              onClick={() => setIsOpenTermsOfUse(true)}
              className="text-black font-semibold inline-block cursor-pointer mr-1">
              Termos de Uso
            </div>
            e a{' '}
            <div
              onClick={() => setIsOpenPrivacyPolicy(true)}
              className="text-black font-semibold inline-block cursor-pointer">
              Politica de Privacidade.
            </div>
          </span>
        </div>
        <span className="text-warmGray-400 text-sm flex flex-row mt-8 justify-center">
          Já possui conta?
          <Link className="ml-1 text-black font-semibold" to="/entrar">
            Entrar
          </Link>
        </span>
      </div>
      <Dialog open={isOpenTermsOfUse} onOpenChange={setIsOpenTermsOfUse}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center mt-10">Termos de Uso do Serviço</DialogTitle>
            <DialogDescription className="flex justify-center text-sm text-black">
              <div className="my-6 ">
                <div className="text-xs text-justify">
                  {' '}
                  <p className="mb-1">
                    <span className="font-semibold">1. Aceitação dos Termos de Uso: </span>
                    Ao acessar ou utilizar os serviços oferecidos pela plataforma Jobbie, você concorda com estes Termos
                    de Uso. Se não concordar com qualquer parte deste contrato, não poderá acessar ou usar nossos
                    serviços.{' '}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">2. Uso da Plataforma: </span>
                    Você concorda em usar a plataforma Jobbie apenas para fins legais e de maneira que não infrinja os
                    direitos de terceiros ou impeça o uso adequado da plataforma por outros usuários.{' '}
                  </p>
                  <p className="mb-1">
                    {' '}
                    <span className="font-semibold">3. Criação de Currículo e Candidatura a Vagas: </span>
                    Ao fornecer informações para criar seu currículo na plataforma Jobbie, você concorda em fornecer
                    informações precisas e atualizadas. A Jobbie não é responsável por informações falsas ou
                    desatualizadas fornecidas pelos usuários.{' '}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">4. Envio de Currículos a Recrutadores: </span>
                    Ao se candidatar a vagas de emprego na plataforma, você concorda que a Jobbie enviará seu currículo
                    aos recrutadores correspondentes. A Jobbie não garante a obtenção de emprego e não se responsabiliza
                    pelas decisões dos recrutadores.{' '}
                  </p>{' '}
                  <p className="mb-1">
                    <span className="font-semibold">5. Modificações nos Termos de Uso: </span>A Jobbie se reserva o
                    direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor
                    imediatamente após a publicação. O uso contínuo da plataforma após tais alterações constituirá
                    aceitação dos novos termos.
                  </p>{' '}
                  <p className="mb-1">
                    <span className="font-semibold">6. Limitação de Responsabilidade: </span>A Jobbie não será
                    responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou
                    punitivos decorrentes do uso ou incapacidade de usar nossos serviços.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsOpenTermsOfUse(false)}
              variant="none"
              className=" bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenPrivacyPolicy} onOpenChange={setIsOpenPrivacyPolicy}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center mt-10">Política de Privacidade</DialogTitle>
            <DialogDescription className="flex justify-center text-sm text-black">
              <div className="my-6 ">
                <div className="text-xs text-justify">
                  {' '}
                  <p className="mb-1">
                    <span className="font-semibold">1. Informações Coletadas: </span>A Jobbie coleta informações
                    pessoais fornecidas pelos usuários, incluindo nome, endereço de e-mail, histórico profissional e
                    educacional, entre outros, para criar currículos e facilitar a candidatura a vagas.
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">2. Uso das Informações: </span>
                    As informações fornecidas pelos usuários serão usadas exclusivamente para os fins da plataforma
                    Jobbie, incluindo a criação de currículos e a facilitação do processo de candidatura a empregos.
                  </p>
                  <p className="mb-1">
                    {' '}
                    <span className="font-semibold">3. Compartilhamento de Informações: </span>A Jobbie pode
                    compartilhar informações pessoais com recrutadores apenas para fins de candidatura a empregos. Não
                    compartilharemos suas informações com terceiros não relacionados à plataforma Jobbie sem seu
                    consentimento.
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">4. Segurança das Informações: </span>A Jobbie implementa medidas de
                    segurança para proteger as informações pessoais dos usuários. No entanto, não podemos garantir a
                    segurança absoluta das informações transmitidas pela internet.
                  </p>{' '}
                  <p className="mb-1">
                    <span className="font-semibold">5. Acesso e Atualização de Informações Pessoais: </span>
                    Os usuários têm o direito de acessar e atualizar suas informações pessoais. Se desejar excluir
                    informações, entre em contato conosco.
                  </p>{' '}
                  <p className="mb-1">
                    <span className="font-semibold">6. Alterações na Política de Privacidade: </span>
                    Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. As alterações
                    serão publicadas na plataforma. O uso contínuo da plataforma após tais alterações constituirá
                    aceitação das novas políticas.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsOpenPrivacyPolicy(false)}
              variant="none"
              className=" bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
