import {ButtonAddNew} from '@/components/button-add-new';
import {ButtonHover} from '@/components/button-hover-animation';
import {JobReviewCard} from '@/components/job-review-card';
import RegisterHeader from '@/components/register-header';
import {Checkbox} from '@/components/ui/checkbox';
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
        <RegisterHeader showProgress={{progress: 5, maxSteps: 8}} />
        <div className="max-w-full items-center flex flex-col mt-10">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg select-none mt-4 mb-4">Revise a Experiência Profissional</p>
          </div>

          {previous_experience.length > 0 ? (
            previous_experience.map((item, index) => (
              <JobReviewCard
                key={index}
                index={index}
                canDelete={true}
                editRoute={`/estudante/experiencia/editar?id=${index}`}
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
                className="text-sm leading-none peer-disabled:cursor-not-allowed font-semibold ml-2">
                Não tenho experiência
              </label>
            </div>
          )}
          {previous_experience.length > 0 ? (
            <ButtonAddNew onClick={() => navigate('/estudante/experiencia/adicionar')} />
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
