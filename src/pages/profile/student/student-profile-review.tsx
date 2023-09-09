import {AddNewButton} from '@/components/add-new-button';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardLarge} from '@/components/review-card-large';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {RootState} from '@/store/store';
import moment from '@/utils/moment';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function StudentProfileReview() {
  const navigate = useNavigate();
  const profileData = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    navigate('/registro/estudante/passo-5');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 7, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-xl select-none mb-4">Seu currículo está pronto?</p>
            <p className="text-sm text-lightblack select-none mb-4">Revise e faça as alterações necessárias.</p>
          </div>
          <ReviewCardLarge
            canDelete={false}
            editRoute={'/registro/estudante/passo-1?editar=true'}
            title={profileData.name}
            subtitle={profileData.phone}
            // description={profileData.email}
          />

          <ReviewCardMedium
            isFatec
            canDelete={false}
            canEdit={true}
            title={profileData.fatecEducation.course_name}
            subtitle={profileData.fatecEducation.institution_name}
            description={profileData.fatecEducation.actual_cycle}
            start_date={moment(profileData.fatecEducation.start_date).format('MMMM [de] YYYY')}
          />

          {profileData.education.map((item, index) => (
            <ReviewCardMedium
              index={index}
              key={index}
              canDelete={true}
              canEdit={true}
              title={item.course}
              subtitle={item.institution_name}
              start_date={moment(item.start_date).format('MMMM [de] YYYY')}
              end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
            />
          ))}
          <AddNewButton onClick={() => navigate('/estudante/educacao/adicionar')} />
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </div>
      </form>
    </div>
  );
}
