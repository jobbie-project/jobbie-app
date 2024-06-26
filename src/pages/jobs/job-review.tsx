import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {Button} from '@/components/ui/button';
import AnimationVerified from '../../assets/verified.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {RootState} from '@/store/store';
import {ContractTypes, JobTimes} from '@/utils/consts';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {ReviewJobPostingCard} from '@/components/review-job-posting-card';
import Lottie from 'lottie-react';
import {toastError} from '@/utils/toast-error';
import Api from '@/services/api/api.service';
import {formatNumberToBRL} from '@/utils/money';
import {JobType} from '@/enums';

export default function JobReview() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const jobData = useSelector((state: RootState) => state.jobData);
  const {handleSubmit} = useForm();

  const onSubmit = async () => {
    try {
      await Api.post('/job/create', jobData);
      setIsOpen(false);
      navigate('/gerenciamento');
    } catch (error) {
      toastError(error);
    }
  };

  const [showButton, setShowButton] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 4, maxSteps: 4.5}} text="Conclua os passos para publicação da vaga." />
        <div className="max-w-full items-center p-5 flex flex-col  mt-6 select-none">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg select-none mb-4">
              Essa é uma prévia do que será exibido para os candidatos
            </p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>

            <ReviewJobPostingCard
              canDelete={false}
              editRoute={'/nova-vaga/passo-1?editar=true&redirect=/nova-vaga/revisar'}
              info="Dados para recebimento de currículos"
              titleForText1="Nome da Empresa:"
              title={` ${jobData.company_name}`}
              subtitle={jobData.owner_name}
              titleForText2="Nome do Responsável:"
              description={jobData.owner_email}
              titleForText3="E-mail:"
            />
            <ReviewJobPostingCard
              canDelete={false}
              editRoute={'/nova-vaga/passo-2?editar=true&redirect=/nova-vaga/revisar'}
              info="Informações da vaga"
              titleForText1="Cargo:"
              title={jobData.position}
              titleForText2="Salário: "
              subtitle={formatNumberToBRL(jobData.salary, true)}
              titleForText3="Modalidade:"
              description={
                jobData.type === JobType.REMOTE
                  ? 'Remoto'
                  : jobData.type === JobType.FACE_TO_FACE
                  ? 'Presencial'
                  : 'Híbrido'
              }
            />
            <ReviewJobPostingCard
              canDelete={false}
              editRoute={'/nova-vaga/passo-3?editar=true&redirect=/nova-vaga/revisar'}
              info="Detalhes da vaga"
              title={ContractTypes.find(contractTypes => contractTypes.value === jobData.contract_type)?.label ?? ''}
              titleForText1="Tipo de Contrato:"
              subtitle={JobTimes.find(jobTime => jobTime.value === jobData.job_time)?.label ?? ''}
              titleForText2="Horário de Trabalho: "
              description={jobData.description}
              titleForText3="Descrição da vaga:"
            />
            <div className="mt-10 flex flex-row justify-between">
              <Button
                onClick={() => navigate('/gerenciamento')}
                className=" bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
                Cancelar
              </Button>
              <ButtonHover
                text={'Continuar'}
                type={'button'}
                callback={() => {
                  setIsOpen(true);
                  setTimeout(() => setShowButton(true), 3500);
                }}
                className="font-semibold text-base"
              />
            </div>
            <div className="mt-8 flex justify-center mb-20">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <div className="flex justify-center m-6">
                      <Lottie
                        animationData={AnimationVerified}
                        autoPlay={true}
                        loop={false}
                        style={{height: 100, width: 100}}
                      />
                    </div>
                    <DialogTitle className="flex justify-center mt-10">
                      Sua vaga está pronta para ser publicada!
                    </DialogTitle>
                    <DialogDescription className="flex justify-center text-sm text-black">
                      <div className="my-6 ">
                        Ao continuar você concorda que esta vaga ficará disponível para candidaturas que serão
                        processadas de acordo com a{' '}
                        <span className="font-semibold text-green"> Politica de Privacidade </span> e
                        <span className="font-semibold text-green"> Termos de Serviço </span> da Jobbie.
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    {showButton && (
                      <Button
                        type="submit"
                        onClick={onSubmit}
                        variant="none"
                        className=" bg-lightgray1 font-semibold text-black">
                        Continuar
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
