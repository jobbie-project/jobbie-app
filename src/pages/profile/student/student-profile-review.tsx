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

export default function StudentProfileReview() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profileData = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    setIsOpen(false);
    navigate('/inicio');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 7, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col  mt-6 select-none">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-xl select-none mb-4">Seu currículo está pronto?</p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>
          </div>

          <div className="max-w-sm w-full font-semibold text-lg text-lightblack flex flex-row justify-between">
            <p className="p-2">Sobre você</p>
          </div>
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/registro/estudante/passo-1?editar=true&redirect=/estudante/perfil/revisar'}
            info="Dados Pessoais"
            title={profileData.name}
            subtitle={profileData.phone}
            // description={profileData.email}
          />
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/registro/estudante/passo-2?editar=true&redirect=/estudante/perfil/revisar'}
            info="Endereço"
            title={`${profileData.address.city}, ${profileData.address.state}`}
            subtitle={`${profileData.address.street}, ${profileData.address.zip_code}`}
          />

          <div className="max-w-sm w-full p-2 font-semibold text-lightblack flex flex-row justify-between">
            <p className="p-2">Formação Acadêmica</p>
            <div className="py-2">
              <ButtonAddNew onClick={() => navigate('/estudante/educacao/adicionar')} />
            </div>
          </div>
          <ReviewCardMedium
            isFatec
            canDelete={false}
            editRoute="/registro/estudante/passo-3?editar=true&redirect=/estudante/perfil/revisar"
            info="Graduação"
            title={profileData.fatecEducation.course_name}
            subtitle={profileData.fatecEducation.institution_name}
            description={profileData.fatecEducation.actual_cycle}
            start_date={moment(profileData.fatecEducation.start_date).format('MMMM [de] YYYY')}
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
          <div className="max-w-sm w-full p-2 font-semibold text-lightblack flex flex-row justify-between">
            <p className="p-2">Experiência Profissional</p>
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
            <div className="flex items-center text-gray-700 font-semibold text-sm select-none mt-4 mb-4 w-full max-w-sm">
              <Checkbox id="noexperience" checked disabled />
              <label
                htmlFor="noexperience"
                className="text-sm leading-none peer-disabled:cursor-not-allowed font-semibold ml-2">
                Não tenho experiência
              </label>
            </div>
          )}

          <div className="max-w-sm w-full p-2 font-semibold text-lightblack flex flex-row justify-between">
            <p className="p-2">Certificações e Licenças</p>
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
            <ButtonHover
              text={'Continuar'}
              type={'button'}
              callback={() => setIsOpen(true)}
              className="font-semibold text-base"
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <div className="flex justify-center m-6">
                    <FaMedal size={60} color={'#b20000'} />
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
