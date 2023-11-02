import {ButtonAddNew} from '@/components/button-add-new';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {ProfileEducation} from '@/store/interfaces/profile-data-interface';
import {RootState} from '@/store/store';
import {Degrees} from '@/utils/consts';
import moment from '@/utils/moment';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function StudentRegisterStep4() {
  const navigate = useNavigate();
  const {education, fatec_education} = useSelector((state: RootState) => state.profileData);
  const {handleSubmit} = useForm();

  const onSubmit = () => {
    navigate('/registro/estudante/passo-5');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
        <div className="max-w-full items-center p-5 flex flex-col mt-8 select-none">
          <div className="max-w-xl w-full">
            <p className="text-black font-semibold text-lg select-none mb-4">Revise a Escolaridade</p>

            <ReviewCardMedium
              maxW="xl"
              isFatec
              canDelete={false}
              editRoute={'/registro/estudante/passo-3?editar=true'}
              info="Graduação"
              titleForText1="Curso: "
              title={fatec_education.course_name}
              titleForText2="Instituição: "
              subtitle={fatec_education.institution_name}
              titleForText3="Período: "
              start_date={moment(fatec_education.start_date).format('MMMM [de] YYYY')}
            />

            {education.map((item: ProfileEducation, index) => (
              <ReviewCardMedium
                maxW="xl"
                index={index}
                key={index}
                canDelete={true}
                editRoute={`/estudante/educacao/editar?id=${index}`}
                info={Degrees.find(degree => degree.value === item.degree)?.label}
                titleForText1="Curso: "
                title={item.course}
                titleForText2="Instituição: "
                subtitle={item.institution_name}
                titleForText3="Período: "
                start_date={moment(item.start_date).format('MMMM [de] YYYY')}
                end_date={item.end_date && moment(item.end_date).format('MMMM [de] YYYY')}
              />
            ))}
            <ButtonAddNew onClick={() => navigate('/estudante/educacao/adicionar')} />
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </div>
      </form>
    </div>
  );
}
