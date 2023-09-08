import {AddNewButton} from '@/components/add-new-button';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {RootState} from '@/store/store';
import moment from '@/utils/moment';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function StudentRegisterStep4() {
  const navigate = useNavigate();
  const {education, fatecEducation} = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    navigate('/registro/estudante/passo-5');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-lg select-none mt-4 mb-4">Revise a Escolaridade</p>
          </div>
          <ReviewCardMedium
            canDelete={false}
            canEdit={true}
            title={fatecEducation.course_name}
            subtitle={fatecEducation.institution_name}
            description={fatecEducation.actual_cycle}
            start_date={moment(fatecEducation.start_date).format('MMMM [de] YYYY')}
          />

          {education.map((item, index) => (
            <ReviewCardMedium
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
