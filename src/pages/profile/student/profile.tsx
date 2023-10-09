import {ButtonAddNew} from '@/components/button-add-new';
import {ButtonHover} from '@/components/button-hover-animation';
import {JobReviewCard} from '@/components/job-review-card';
import RegisterHeader from '@/components/register-header';
import {ReviewCardLarge} from '@/components/review-card-large';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {ReviewCardSmall} from '@/components/review-card-small';
import {FaMedal} from 'react-icons/fa';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {RootState} from '@/store/store';
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
import {on} from 'events';

export default function Profile() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profileData = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    setIsOpen(false);
    navigate('navigate(-1)');
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
        <div className="max-w-full items-center p-5 flex flex-col  mt-6 select-none">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-xl select-none mb-4">Seu currículo</p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>
          </div>

          <div className="max-w-xl w-full font-semibold text-lg text-lightblack flex flex-row justify-between">
            <p className="py-2">Sobre você</p>
          </div>
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/registro/estudante/passo-1?editar=true&redirect=/estudante/perfil/revisar'}
            info="Dados Pessoais"
            titleForText1="Nome:"
            title={profileData.name}
            titleForText2="Telefone:"
            subtitle={profileData.phone}
          />
          <ReviewCardLarge
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
            <div className="py-2">
              <ButtonAddNew onClick={() => navigate('/estudante/educacao/adicionar')} />
            </div>
          </div>
          <ReviewCardMedium
            isFatec
            canDelete={false}
            editRoute="/registro/estudante/passo-3?editar=true&redirect=/estudante/perfil/revisar"
            info="Graduação"
            titleForText1="Curso:"
            title={profileData.fatec_education.course_name}
            titleForText2="Instituição:"
            subtitle={profileData.fatec_education.institution_name}
            titleForText3="Ciclo:"
            description={profileData.fatec_education.actual_cycle}
            start_date={moment(profileData.fatec_education.start_date).format('MMMM [de] YYYY')}
          />

          {profileData.education.map((item, index) => (
            <ReviewCardMedium
              index={index}
              key={index}
              editRoute={`/estudante/educacao/editar?id=${index}&redirect=/estudante/perfil/revisar`}
              canDelete={true}
              info={Degrees.find(degree => degree.value === item.degree)?.label}
              title={item.course}
              subtitle={item.institution_name}
              start_date={moment(item.start_date).format('MMMM [de] YYYY')}
              end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
            />
          ))}
          <div className="max-w-xl w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Experiência Profissional</p>
            <div className="py-2">
              <ButtonAddNew
                onClick={() => navigate('/estudante/experiencia/adicionar?redirect=/estudante/perfil/revisar')}
              />
            </div>
          </div>
          {profileData.previous_experience.length > 0 ? (
            profileData.previous_experience.map((item, index) => (
              <JobReviewCard
                key={index}
                index={index}
                canDelete={true}
                editRoute={`/estudante/experiencia/editar?id=${index}&redirect=/estudante/perfil/revisar`}
                title={item.position}
                subtitle={item.company_name}
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
            <div className="py-2">
              <ButtonAddNew
                onClick={() => navigate('/estudante/experiencia/adicionar?redirect=/estudante/perfil/revisar')}
              />
            </div>
          </div>
          {profileData.certifications.map((item, index) => (
            <ReviewCardSmall index={index} key={index} canDelete={true} canEdit={true} title={item} />
          ))}

          <div className="mt-8 flex justify-center mb-20">
            <ButtonHover text={'Continuar'} type={'button'} callback={onSubmit} className="font-semibold text-base" />
          </div>
        </div>
      </form>
    </div>
  );
}
