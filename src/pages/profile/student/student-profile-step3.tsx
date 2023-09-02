import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import GeneralInput from '@/components/general-input';
import {SelectDropdown} from '@/components/select-dropdown';

interface FormData {
  institution: string;
  ciclo: string;
  dt_inicio: string;
}

export default function StudentRegisterStep3() {
  const {register, handleSubmit} = useForm<FormData>({
    defaultValues: {
      ciclo: '',
      dt_inicio: '',
    },
  });

  const navigate = useNavigate();

  const institutions = [
    {value: '2', label: 'Fatec Araçatuba'},
    {value: '3', label: 'Fatec Araraquara'},
    {value: '4', label: 'Fatec Barueri'},
    {value: '5', label: 'Fatec Bauru'},
    {value: '6', label: 'Fatec Botucatu'},
    {value: '7', label: 'Fatec Bragança Paulista'},
    {value: '8', label: 'Fatec Ribeirão Preto'},
  ];

  const courses = [
    {value: '2', label: 'Análise e Desenvolvimento de Sistemas'},
    {value: '3', label: 'Gestão e Inovação de Negócios'},
    {value: '4', label: 'Sistemas Biomédicos'},
  ];

  const onSubmit = (data: FormData) => {
    try {
      if (!data.ciclo) throw new Error('É necessário informar o ciclo atual.');
      navigate('/registro/estudante/passo-4');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[336px]">
          <div className="max-w-xs w-full">
            <p className="text-black font-semibold text-base select-none mt-20">
              Em qual instituição Fatec você estuda?
            </p>
          </div>
          <SelectDropdown label={'Selecione sua Instituição'} options={institutions} />
          <SelectDropdown label={'Selecione seu Curso'} options={courses} />
          <div className="w-full inline-flex mt-4 justify-between">
            <GeneralInput register={register} registerName="ciclo" label="Ciclo" required className="w-40" />
            <GeneralInput register={register} registerName="dt_inicio" label="Data de ínicio" className="w-40" />
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base after:bg-red" />
          </div>
        </form>
      </div>
    </div>
  );
}
