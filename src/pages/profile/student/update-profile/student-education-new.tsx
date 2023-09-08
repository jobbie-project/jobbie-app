import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {useAppDispatch} from '@/store/store';
import {SelectCountry} from '@/components/select-country';
import moment from '@/utils/moment';
import {SelectDropdown} from '@/components/select-dropdown';
import {setUserEducation} from '@/store/slices/profile-data';
import {useState} from 'react';
import {ProfileEducation} from '@/store/interfaces';
import {Checkbox} from '@/components/ui/checkbox';

const degree = [
  {value: '1', label: 'Técnico'},
  {value: '2', label: 'Graduação'},
  {value: '3', label: 'Pós-graduação'},
  {value: '4', label: 'Mestrado'},
  {value: '5', label: 'Doutorado'},
];

export default function AddNewEducation() {
  const {register, handleSubmit} = useForm<ProfileEducation>();
  const [current, setCurrent] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: ProfileEducation) => {
    try {
      if (!data.location) throw new Error('É necessário informar a Cidade.');
      if (!data.institution_name) throw new Error('É necessário informar a instituição.');
      if (!data.start_date) throw new Error('É necessário informar a data de ínicio do curso.');
      if (!data.course) throw new Error('É necessário informar o curso.');
      const isAfter = moment(data.start_date).isAfter(data.end_date);
      if (isAfter) throw new Error('A data de ínicio não pode ser maior que a data de fim.');
      const isSame = moment(data.start_date).isSame(data.end_date);
      if (isSame) throw new Error('A data de ínicio não pode ser a mesma que a data de fim.');
      dispatch(setUserEducation({...data, end_date: current ? undefined : data.end_date}));
      navigate('/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-lg select-none mt-4">Adicionando nova Escolaridade</p>
          </div>
          <SelectCountry />
          <GeneralInput label={'Cidade, Estado'} register={register} registerName="location" required />
          <GeneralInput label={'Nome da Instituição'} register={register} registerName="institution_name" required />
          <GeneralInput label={'Nome do Curso'} register={register} registerName="course" required />
          <SelectDropdown label={'Grau'} options={degree} />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput
              register={register}
              registerName="start_date"
              label="Data de ínicio"
              className="w-36"
              type="month"
              required
            />
            {!current && (
              <GeneralInput
                register={register}
                registerName="end_date"
                label="Data de fim"
                className="w-36"
                type="month"
              />
            )}
          </div>
          <div className="flex items-center mt-4">
            <Checkbox id="current" onClick={() => setCurrent(!current)} />
            <label htmlFor="current" className="ml-2 text-sm">
              Emprego Atual
            </label>
          </div>

          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-redDefault" />
          </div>
        </form>
      </div>
    </div>
  );
}
