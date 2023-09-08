import {AddNewButton} from '@/components/add-new-button';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {RootState} from '@/store/store';
import moment from '@/utils/moment';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
export default function StudentRegisterStep6() {
  const navigate = useNavigate();
  const {previous_experience} = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    navigate('/registro/estudante/passo-7');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 4, maxSteps: 8}} />
        <div className="max-w-full items-center flex flex-col min-h-screen mt-10">
          <div className="max-w-sm w-full">
            <p className="text-black font-semibold text-lg select-none mt-4 mb-4">Revise a Experiência Profissional</p>
          </div>

          {previous_experience.length > 1 ? (
            previous_experience.map((item, index) => (
              <ReviewCardMedium
                key={index}
                canDelete={true}
                canEdit={true}
                title={item.position}
                subtitle={item.company_name}
                start_date={moment(item.start_date).format('MMMM [de] YYYY')}
                end_date={moment(item.end_date).format('MMMM [de] YYYY')}
              />
            ))
          ) : (
            <div className="flex items-center text-gray-700 font-semibold text-sm select-none mt-8 mb-4 w-full max-w-sm">
              <Checkbox id="noexperience" checked disabled />
              <label
                htmlFor="noexperience"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed font-semibold ml-2">
                Nenhuma Experiência Profissional Adicionada
              </label>
            </div>
          )}
          {previous_experience.length > 1 ? (
            <AddNewButton onClick={() => navigate('/estudante/experiencia/adicionar')} />
          ) : (
            <div></div>
          )}
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </div>
      </form>
    </div>
  );
}
