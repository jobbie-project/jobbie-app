import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {RootState} from '@/store/store';
import moment from '@/utils/moment';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function StudentRegisterStep4() {
  const navigate = useNavigate();
  const {education} = useSelector((state: RootState) => state.profileData);

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        {education.map((item, index) => (
          <ReviewCardMedium
            key={index}
            canDelete={false}
            canEdit={true}
            title={item.degree}
            subtitle={item.institution_name}
            description={item.actual_cycle}
            date={moment(item.start_date).format('MMMM [de] YYYY')}
          />
        ))}

        <div className="mt-8 flex justify-center">
          <ButtonHover text={'Continuar'} type={'button'} className="font-semibold text-base after:bg-red" />
        </div>
      </div>
    </div>
  );
}
