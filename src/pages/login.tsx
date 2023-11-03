import {Logoblack} from '@/icons/logo-black';
import PasswordInput from '@/components/password';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import * as EmailValidator from 'email-validator';
import GeneralInput from '@/components/general-input';
import {Checkbox} from '@/components/ui/checkbox';
import Api from '@/services/api/api.service';
import authenticationService from '@/services/authentication/authentication.service';
import {Slogan} from '@/icons/slogan';
import {Carousel} from '@material-tailwind/react';
import Adrielly from '@/icons/ass_adrielly';
import Felipe from '@/icons/ass_felipe';
import PairProgramming from '@/icons/pair-programming';
import {useWindowSize} from '@/hooks/useWindowSize';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {width} = useWindowSize();

  const onSubmit = async (formData: FormData) => {
    try {
      if (!formData.email) throw new Error('Insira seu email.');
      if (!EmailValidator.validate(formData.email)) throw new Error('Insira um email válido');
      if (!formData.password) throw new Error('Insira sua senha.');
      const {data} = await Api.post('/auth/authenticate', {username: formData.email, password: formData.password});
      authenticationService.authenticate(data.id, data.access_token, data.name, data.role, data.profile_completed);
      authenticationService.handleRedirect(data, navigate);
    } catch (error) {
      toastError(error);
    }
  };

  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row justify-between">
          <div className="w-[50%] h-screen flex flex-col p-5 items-center">
            <div className="max-w-md w-full m-auto">
              <div className="flex justify-center">
                <Logoblack width={'100'} height={'50'} />
              </div>
              <p className="text-black font-regular text-base select-none mt-4 flex justify-center ">
                Continue com sua conta Jobbie.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-8">
                  <GeneralInput register={register} registerName="email" label="Email" />
                  <PasswordInput register={register} text="Senha" registerName="password" className="mt-4" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember" className="mb-1" />
                    <label htmlFor="remember" className="text-sm leading-none peer-disabled:cursor-not-allowed ml-2">
                      Lembrar de mim
                    </label>
                  </div>
                  <div
                    onClick={() => navigate('/recuperacao-de-conta')}
                    className="cursor-pointer text-sm text-black font-semibold">
                    Esqueceu sua senha?
                  </div>
                </div>
                <GeneralButton text={'Entrar'} type={'submit'} />
                <div className="text-sm text-warmGray-400 font-normal flex flex-row mt-8 justify-center">
                  Não possui conta? &nbsp;
                  <Link className="text-sm text-black font-semibold" to="/registro">
                    Cadastre-se
                  </Link>
                </div>
              </form>
              <div className="text-xs text-warmGray-400 font-normal flex flex-row mt-8 justify-center text-center">
                <span>
                  Ao continuar você concorda que declara que leu e concorda com os{' '}
                  <a className="text-black font-semibold inline-block" href="">
                    Termos de Uso
                  </a>{' '}
                  e a{' '}
                  <a className="text-black font-semibold inline-block" href="">
                    Politica de Privacidade.
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-lightgray1 h-screen w-[50%] flex flex-col">
            <div className={width <= 1400 ? 'flex flex-row ml-10' : 'flex flex-row mx-auto'}>
              <div className="flex flex-row justify-start z-10">
                {width <= 1400 ? <Slogan width="360" height="360" /> : <Slogan width="460" height="460" />}
              </div>
              <div className="mt-32 absolute right-0">
                {width <= 1400 ? (
                  <PairProgramming width="420" height="280" />
                ) : (
                  <PairProgramming width="520" height="380" />
                )}
              </div>
            </div>
            <div
              className={
                width <= 1400 ? 'flex h-full flex-col justify-evenly mt-8' : 'flex h-full flex-col justify-evenly mt-6'
              }>
              <Carousel
                autoplay
                autoplayDelay={15000}
                loop
                nextArrow={() => {}}
                prevArrow={() => {}}
                className={
                  width <= 1400
                    ? 'bg-white max-w-[580px] mx-auto h-[150px] rounded-md select-none'
                    : 'bg-white max-w-[600px] mx-auto h-[300px] rounded-md select-none'
                }
                navigation={({setActiveIndex, activeIndex, length}) => (
                  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill('').map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? 'w-8 bg-[#A7A7A7]' : 'w-4 bg-[#A7A7A7]/50'
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}>
                <div className={width <= 1400 ? 'h-[80%] px-10 py-4 flex w-full' : 'h-[80%] px-10 flex w-full'}>
                  <div
                    className={
                      width <= 1400
                        ? 'text-xs text-[#A7A7A7] m-auto text-justify'
                        : 'text-sm text-[#A7A7A7] m-auto text-justify'
                    }>
                    <p className="font-semibold mb-2">Sobre a Jobbie</p>A Jobbie é a visão transformadora de dois
                    estudantes,{' '}
                    <a
                      href="https://www.linkedin.com/in/adriellyisly/"
                      target="_blank"
                      className="font-bold underline cursor-pointer">
                      Adrielly Isly
                    </a>{' '}
                    e{' '}
                    <a
                      href="https://www.linkedin.com/in/felipe-gabriel-botelho/"
                      target="_blank"
                      className="font-bold underline cursor-pointer">
                      Felipe Botelho
                    </a>
                    , do curso de Análise e Desenvolvimento de Sistemas com Orientação do Docente{' '}
                    <a
                      href="http://lattes.cnpq.br/7498826465229905"
                      target="_blank"
                      className="font-bold underline cursor-pointer">
                      Fabrício Gustavo Henrique
                    </a>
                    . Nasceu da necessidade de simplificar a busca por oportunidades de emprego relacionadas aos
                    estudos. Nossa missão é conectar estudantes em busca de experiência na área de estudo com empresas
                    que oferecem oportunidades de emprego.
                  </div>
                </div>
                <div className={width <= 1400 ? 'h-[80%] px-10 py-4 flex w-full' : 'h-[80%] px-10 flex w-full'}>
                  <div
                    className={
                      width <= 1400
                        ? 'text-xs text-[#A7A7A7] m-auto text-justify'
                        : 'text-sm text-[#A7A7A7] m-auto text-justify'
                    }>
                    <p className="font-semibold mb-2">O que Fazemos?</p>Oferecemos uma plataforma que facilita o
                    registro de estudantes e empresas, a elaboração de currículos, a publicação de vagas e a busca por
                    oportunidades com filtros criteriosos. Capacitamos os estudantes a se candidatarem diretamente às
                    vagas que correspondem às suas ambições e habilidades.
                  </div>
                </div>
                <div className={width <= 1400 ? 'h-[80%] px-10 py-4 flex w-full' : 'h-[80%] px-10 flex w-full'}>
                  <div
                    className={
                      width <= 1400
                        ? 'text-xs text-[#A7A7A7] m-auto text-justify'
                        : 'text-sm text-[#A7A7A7] m-auto text-justify'
                    }>
                    <p className="font-semibold mb-2">Nosso Compromisso</p>Estamos comprometidos em criar uma comunidade
                    de crescimento e oportunidades. Nossa missão é conectar estudantes a oportunidades valiosas e ajudar
                    empresas a encontrar talentos qualificados. A Jobbie é fruto de um projeto de TCC concluído em
                    novembro de 2023. Junte-se a nós nesta jornada e seja parte do nosso ecossistema que promove o
                    desenvolvimento profissional e o sucesso mútuo.
                  </div>
                </div>
              </Carousel>
              <div className="flex flex-row w-[600px] mx-auto justify-end">
                <a href="https://www.linkedin.com/in/adriellyisly/" target="_blank">
                  {width <= 1400 ? <Adrielly width="100" height="42" /> : <Adrielly width="138" height="42" />}
                </a>
                <a href="https://www.linkedin.com/in/felipe-gabriel-botelho/" target="_blank">
                  {width <= 1400 ? <Felipe width="100" height="42" /> : <Felipe width="138" height="42" />}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
