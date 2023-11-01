import {useGetStudentData} from '@/hooks/useGetStudentData';
import {JobReviewCard} from '@/components/job-review-card';
import {ReviewCardLarge} from '@/components/review-card-large';
import {ReviewCardMedium} from '@/components/review-card-medium';
import {ReviewCardSmall} from '@/components/review-card-small';
import {Degrees} from '@/utils/consts';
import moment from '@/utils/moment';
import {Checkbox} from '@radix-ui/react-checkbox';

export default function CurriculumViewComponent({studentId}: {studentId: string}) {
  const {student, loading} = useGetStudentData(studentId);
  return (
    !loading &&
    student && (
      <div className="w-full items-center p-5 flex flex-col  mt-6 select-none">
        <div className=" w-full">
          <p className="text-black font-semibold text-xl select-none mb-4">Currículo de {student.user.name}</p>
        </div>
        <div className="w-full font-semibold text-lg text-lightblack flex flex-row justify-between">
          <p className="py-2">Sobre o candidato</p>
        </div>
        <ReviewCardLarge
          canDelete={false}
          info="Dados Pessoais"
          titleForText1="Nome:"
          title={student.user.name}
          titleForText2="Telefone:"
          subtitle={student.phone ?? 'Não informado'}
        />
        <ReviewCardLarge
          canDelete={false}
          info="Endereço"
          titleForText1="Localização:"
          title={`${student.curriculum.address.city}, ${student.curriculum.address.state}`}
          titleForText2="Rua:"
          subtitle={`${student.curriculum.address.street}, ${student.curriculum.address.zip_code}`}
        />

        <div className=" w-full font-semibold text-lightblack flex flex-row justify-between">
          <p className="py-2 flex items-end">Formação Acadêmica</p>
        </div>
        <ReviewCardMedium
          isFatec
          canDelete={false}
          info="Graduação"
          titleForText1="Curso:"
          title={student.curriculum.fatec_course.name}
          titleForText2="Instituição:"
          subtitle={student.curriculum.fatec_institution.name}
          titleForText3="Período:"
          description={`${student.curriculum.fatec_cycle}`}
          start_date={moment(student.curriculum.fatec_start_date).format('MMMM [de] YYYY')}
        />

        {student.curriculum.education.map((item, index) => (
          <ReviewCardMedium
            userIsBeignUpdated
            index={index}
            key={index}
            canDelete={false}
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
        <div className=" w-full font-semibold text-lightblack flex flex-row justify-between">
          <p className="py-2 flex items-end">Experiência Profissional</p>
        </div>
        {student.curriculum.previous_experience.length > 0 ? (
          student.curriculum.previous_experience.map((item, index) => (
            <JobReviewCard
              userIsBeignUpdated
              key={index}
              index={index}
              canDelete={false}
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
          <div className="flex items-center text-gray-700 font-semibold text-sm select-none mt-4 mb-4 w-full ">
            <Checkbox id="noexperience" checked disabled />
            <label
              htmlFor="noexperience"
              className="text-sm leading-none peer-disabled:cursor-not-allowed font-semibold">
              Não tem experiência
            </label>
          </div>
        )}

        <div className=" w-full font-semibold text-lightblack flex flex-row justify-between">
          <p className="py-2 flex items-end">Certificações e Licenças</p>
        </div>
        <div className=" w-full">
          <div className="mt-4">
            {student.curriculum.certifications.map((item, index) => (
              <ReviewCardSmall
                index={index}
                key={index}
                canDelete={false}
                canEdit={false}
                title={item}
                userIsBeignUpdated
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}
