import {Slogan} from '@/icons/slogan';
import {Carousel} from '@material-tailwind/react';
import Adrielly from '@/icons/ass_adrielly';
import Felipe from '@/icons/ass_felipe';
import {Header} from '@/components/header';
import PairProgramming from '@/icons/pair-programming';

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="max-w-full items-center flex flex-col text-sm">
        <div className="max-w-4xl w-full">
          <div className="flex flex-row">
            <div className="z-10">
              <Slogan width="380" height="380" />
            </div>
            <div className="relative right-28">
              <PairProgramming width="620" height="520" />
            </div>
          </div>
          <div className="flex">
            <Carousel
              autoplay
              autoplayDelay={15000}
              loop
              nextArrow={() => {}}
              prevArrow={() => {}}
              className="bg-lightgray1 w-full h-full mx-auto py-12 rounded-md select-none"
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
              <div className="h-[90%] px-10 flex w-full">
                <div className="text-sm text-[#A7A7A7] m-auto text-justify">
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
                  . Nasceu da necessidade de simplificar a busca por oportunidades de emprego relacionadas aos estudos.
                  Nossa missão é conectar estudantes em busca de experiência na área de estudo com empresas que oferecem
                  oportunidades de emprego.
                </div>
              </div>
              <div className="h-[90%] px-10 flex w-full">
                <div className="text-sm text-[#A7A7A7] m-auto text-justify">
                  <p className="font-semibold mb-2">O que Fazemos?</p>Oferecemos uma plataforma que facilita o registro
                  de estudantes e empresas, a elaboração de currículos, a publicação de vagas e a busca por
                  oportunidades com filtros criteriosos. Capacitamos os estudantes a se candidatarem diretamente às
                  vagas que correspondem às suas ambições e habilidades.
                </div>
              </div>
              <div className="h-[90%] px-10 flex w-full">
                <div className="text-sm text-[#A7A7A7] m-auto text-justify">
                  <p className="font-semibold mb-2">Nosso Compromisso</p>Estamos comprometidos em criar uma comunidade
                  de crescimento e oportunidades. Nossa missão é conectar estudantes a oportunidades valiosas e ajudar
                  empresas a encontrar talentos qualificados. A Jobbie é fruto de um projeto de TCC concluído em
                  novembro de 2023. Junte-se a nós nesta jornada e seja parte do nosso ecossistema que promove o
                  desenvolvimento profissional e o sucesso mútuo.
                </div>
              </div>
            </Carousel>
          </div>
          <div className="flex justify-end w-full mt-6">
            <div className="flex flex-col">
              <a href="https://www.linkedin.com/in/adriellyisly/" target="_blank">
                <Adrielly width="138" height="42" />
              </a>
            </div>
            <div className="flex flex-col right-0">
              <a href="https://www.linkedin.com/in/felipe-gabriel-botelho/" target="_blank">
                <Felipe width="138" height="42" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
