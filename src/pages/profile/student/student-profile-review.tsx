import {ButtonAddNew} from '@/components/button-add-new';
import {ButtonHover} from '@/components/button-hover-animation';
import {JobReviewCard} from '@/components/job-review-card';
import RegisterHeader from '@/components/register-header';
import {ReviewCardLarge} from '@/components/review-card-large';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {ReviewCardSmall} from '@/components/review-card-small';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {setUserCertifications} from '@/store/slices/profile-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {RootState, useAppDispatch} from '@/store/store';
import {Degrees} from '@/utils/consts';
import moment from '@/utils/moment';
import {Checkbox} from '@radix-ui/react-checkbox';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {toastError} from '@/utils/toast-error';
import Api from '@/services/api/api.service';
import {castFatecEducationData} from '@/utils/helpers';
import Lottie from 'lottie-react';
import AnimationVerified from '../../../assets/verified.json';

export default function StudentProfileReview() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profileData = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();
  const [certification, setCertification] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    setIsOpen(false);
    navigate('/inicio');
  };

  const handleSubmitProfile = async () => {
    try {
      await Api.post('/student/create', {
        ...profileData,
        fatec_education: castFatecEducationData(profileData.fatec_education),
      });
      setIsOpen(true);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 7, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col mt-6 select-none">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg select-none mb-4">Seu currículo está pronto?</p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>
          </div>

          <div className="max-w-xl w-full font-semibold text-lg text-lightblack flex flex-row justify-between">
            <p className="py-2">Sobre você</p>
          </div>
          <ReviewCardLarge
            maxW="xl"
            canDelete={false}
            editRoute={'/registro/estudante/passo-1?editar=true&redirect=/estudante/perfil/revisar'}
            info="Dados Pessoais"
            titleForText1="Nome:"
            title={profileData.name}
            titleForText2="Telefone:"
            subtitle={profileData.phone}
          />
          <ReviewCardLarge
            maxW="xl"
            canDelete={false}
            editRoute={'/registro/estudante/passo-2?editar=true&redirect=/estudante/perfil/revisar'}
            info="Endereço"
            titleForText1="Localização:"
            title={`${profileData.address.city}, ${profileData.address.state}`}
            titleForText2="Rua:"
            subtitle={`${profileData.address.street}, ${profileData.address.zip_code}`}
          />

          <div className="max-w-xl w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Formação Acadêmica</p>
            <div className="mb-2">
              <ButtonAddNew
                onClick={() => navigate('/estudante/educacao/adicionar?redirect=/estudante/perfil/revisar')}
              />
            </div>
          </div>
          <ReviewCardMedium
            maxW="xl"
            isFatec
            canDelete={false}
            editRoute="/registro/estudante/passo-3?editar=true&redirect=/estudante/perfil/revisar"
            info="Graduação"
            titleForText1="Curso:"
            title={profileData.fatec_education.course_name}
            titleForText2="Instituição:"
            subtitle={profileData.fatec_education.institution_name}
            titleForText3="Período:"
            description={profileData.fatec_education.actual_cycle}
            start_date={moment(profileData.fatec_education.start_date).format('MMMM [de] YYYY')}
          />

          {profileData.education.map((item, index) => (
            <ReviewCardMedium
              maxW="xl"
              index={index}
              key={index}
              editRoute={`/estudante/educacao/editar?id=${index}&redirect=/estudante/perfil/revisar`}
              canDelete={true}
              info={Degrees.find(degree => degree.value === item.degree)?.label}
              titleForText1="Curso:"
              title={item.course}
              titleForText2="Instituição:"
              subtitle={item.institution_name}
              titleForText3="Período:"
              start_date={moment(item.start_date).format('MMMM [de] YYYY')}
              end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
            />
          ))}
          <div className="max-w-xl w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Experiência Profissional</p>
            <div className="mb-2">
              <ButtonAddNew
                onClick={() => navigate('/estudante/experiencia/adicionar?redirect=/estudante/perfil/revisar')}
              />
            </div>
          </div>
          {profileData.previous_experience.length > 0 ? (
            profileData.previous_experience.map((item, index) => (
              <JobReviewCard
                maxW="xl"
                key={index}
                index={index}
                canDelete={true}
                editRoute={`/estudante/experiencia/editar?id=${index}&redirect=/estudante/perfil/revisar`}
                titleForText1="Cargo:"
                title={item.position}
                titleForText2="Empresa:"
                subtitle={item.company_name}
                titleForText3="Período:"
                start_date={moment(item.start_date).format('MMMM [de] YYYY')}
                end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
              />
            ))
          ) : (
            <div className="flex items-center text-gray-700 font-semibold text-sm select-none mt-4 mb-4 w-full max-w-xl">
              <Checkbox id="noexperience" checked disabled />
              <label
                htmlFor="noexperience"
                className="text-sm leading-none peer-disabled:cursor-not-allowed font-semibold">
                Não tenho experiência
              </label>
            </div>
          )}

          <div className="max-w-xl w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Certificações e Licenças</p>
          </div>
          <div className="max-w-xl w-full">
            <div className="flex justify-between">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertification(e.target.value)}
                type="text"
                value={certification}
                placeholder="Adicione uma certificação ou licença"
                className="bg-lightgray1 border-none"
              />
              <div className="ml-4">
                <ButtonAddNew
                  onClick={() => {
                    setCertification('');
                    dispatch(setUserCertifications(certification));
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              {profileData.certifications.map((item, index) => (
                <ReviewCardSmall maxW="xl" index={index} key={index} canDelete={true} canEdit={true} title={item} />
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center mb-20">
            <ButtonHover
              text={'Continuar'}
              type={'button'}
              callback={handleSubmitProfile}
              className="font-semibold text-base"
            />
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
                  <DialogTitle className="flex justify-center">Parabéns, seu perfil está completo!</DialogTitle>
                  <DialogDescription className="flex justify-center">
                    Vamos encontrar sua próxima vaga.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={onSubmit}
                    className=" bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
                    Continuar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
}
