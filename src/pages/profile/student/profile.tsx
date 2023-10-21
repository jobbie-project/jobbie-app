import {ButtonAddNew} from '@/components/button-add-new';
import {ButtonHover} from '@/components/button-hover-animation';
import {JobReviewCard} from '@/components/job-review-card';
import RegisterHeader from '@/components/register-header';
import {ReviewCardLarge} from '@/components/review-card-large';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {ReviewCardSmall} from '@/components/review-card-small';
import {RootState, useAppDispatch} from '@/store/store';
import {Degrees} from '@/utils/consts';
import moment from '@/utils/moment';
import {Checkbox} from '@radix-ui/react-checkbox';
import {useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {useGetUserData} from '@/hooks/useGetUserData';
import {setUpdateProfileData, setUpdateUserCertifications} from '@/store/slices/update-profile-data';
import Api from '@/services/api/api.service';
import {castFatecEducationData} from '@/utils/helpers';
import {toastError} from '@/utils/toast-error';
import {toast} from 'react-toastify';

export default function Profile() {
  const navigate = useNavigate();
  const [certification, setCertification] = useState('');
  const dispatch = useAppDispatch();
  const profileData = useSelector((state: RootState) => state.updateProfileData);
  const {user, loading} = useGetUserData();
  const [params] = useSearchParams();

  const handleSubmitProfile = async () => {
    try {
      await Api.patch('/student', {
        ...profileData,
        fatec_education: castFatecEducationData(profileData.fatec_education),
      });
      toast.success('Perfil atualizado com sucesso!');
      navigate('/inicio');
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (!params.get('revisar') && user) {
      dispatch(setUpdateProfileData(user));
    }
  }, [loading]);

  return (
    <div>
      <form>
        <RegisterHeader showProgress={{progress: 7, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col  mt-6 select-none">
          <div className="max-w-md w-full">
            <p className="text-black font-semibold text-xl select-none mb-4">Seu currículo</p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>
          </div>

          <div className="max-w-md w-full font-semibold text-lg text-lightblack flex flex-row justify-between">
            <p className="py-2">Sobre você</p>
          </div>
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/perfil/editar/passo-1?update=true&editar=true&redirect=/perfil/editar?revisar=true'}
            info="Dados Pessoais"
            titleForText1="Nome:"
            title={profileData.name}
            titleForText2="Telefone:"
            subtitle={profileData.phone}
          />
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/perfil/editar/passo-2?update=true&editar=true&redirect=/perfil/editar?revisar=true'}
            info="Endereço"
            titleForText1="Localização:"
            title={`${profileData.address.city}, ${profileData.address.state}`}
            titleForText2="Rua:"
            subtitle={`${profileData.address.street}, ${profileData.address.zip_code}`}
          />

          <div className="max-w-md w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Formação Acadêmica</p>
            <div className="mb-2">
              <ButtonAddNew
                onClick={() =>
                  navigate('/estudante/educacao/adicionar?update=true&redirect=/perfil/editar?revisar=true')
                }
              />
            </div>
          </div>
          <ReviewCardMedium
            isFatec
            canDelete={false}
            editRoute="/perfil/editar/passo-3?update=true&editar=true&redirect=/perfil/editar?revisar=true"
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
              userIsBeignUpdated
              index={index}
              key={index}
              editRoute={`/estudante/educacao/editar?update=true&id=${index}&redirect=/perfil/editar?revisar=true`}
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
          <div className="max-w-md w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Experiência Profissional</p>
            <div className="mb-2">
              <ButtonAddNew
                onClick={() => navigate('/perfil/editar/passo-5?update=true&redirect=/perfil/editar?revisar=true')}
              />
            </div>
          </div>
          {profileData.previous_experience.length > 0 ? (
            profileData.previous_experience.map((item, index) => (
              <JobReviewCard
                userIsBeignUpdated
                key={index}
                index={index}
                canDelete={true}
                titleForText1="Cargo:"
                editRoute={`/perfil/editar/passo-5?update=true&editar=true&id=${index}&redirect=/perfil/editar?revisar=true`}
                title={item.position}
                titleForText2="Empresa:"
                subtitle={item.company_name}
                titleForText3="Período:"
                start_date={moment(item.start_date).format('MMMM [de] YYYY')}
                end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
              />
            ))
          ) : (
            <div className="flex items-center text-gray-700 font-semibold text-sm select-none m-4 max-w-md">
              <Checkbox id="noexperience" checked disabled />
              <label
                htmlFor="noexperience"
                className="text-sm leading-none peer-disabled:cursor-not-allowed font-semibold">
                Não tenho experiência
              </label>
            </div>
          )}

          <div className="max-w-md w-full font-semibold text-lightblack flex flex-row justify-between">
            <p className="py-2 flex items-end">Certificações e Licenças</p>
          </div>
          <div className="max-w-md w-full">
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
                    dispatch(setUpdateUserCertifications(certification));
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              {profileData.certifications.map((item, index) => (
                <ReviewCardSmall
                  index={index}
                  key={index}
                  canDelete={true}
                  canEdit={true}
                  title={item}
                  userIsBeignUpdated
                />
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
          </div>
        </div>
      </form>
    </div>
  );
}
