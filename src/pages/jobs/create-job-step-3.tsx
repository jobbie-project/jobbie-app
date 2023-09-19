import {useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import RegisterHeader from '@/components/register-header';
import {ButtonHover} from '@/components/button-hover-animation';
import {ContractTypes, JobTime} from '@/utils/consts';
import Textarea from '@/components/ui/textarea';
import {SelectDropdown} from '@/components/select-dropdown';
import {setJobContractType, setJobDescription, setJobTime} from '@/store/slices/job-data';

interface FormData {
  description: string;
  time: string;
  contract_types: string;
}

export default function CreateJobStep3() {
  const {register, handleSubmit, setValue, watch} = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const onSubmit = (data: FormData) => {
    try {
      if (!data.contract_types) throw new Error('Insira o Tipo da Vaga.');
      dispatch(setJobContractType(data.contract_types));
      if (!data.time) throw new Error('Insira o Horário de Trabalho.');
      dispatch(setJobTime(data.time));
      if (!data.description) throw new Error('Insira a Descrição da Vaga.');
      dispatch(setJobDescription(data.description));
      navigate(params.get('redirect') ?? '/nova-vaga/revisar');
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <RegisterHeader showProgress={{progress: 3, maxSteps: 4.5}} text="Conclua os passos para publicação da vaga." />
      <div className="py-6 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
          <div className="font-semibold mt-4 text-lg select-none">
            Adicione os detalhes da vaga para encontrar seu próximo colaborador.
          </div>
          <div className="mt-8 w-full">
            <SelectDropdown
              className="text-black"
              callback={value => setValue('contract_types', value)}
              value={watch('contract_types')}
              label={'Selecione o Tipo da Vaga'}
              options={ContractTypes}
            />
            <SelectDropdown
              className="text-black"
              callback={value => setValue('time', value)}
              value={watch('time')}
              label={'Selecione o Horário de Trabalho'}
              options={JobTime}
            />
            <div className="mt-6">
              <div className="text-sm font-semibold my-2">
                Descrição da vaga<span className="text-redDefault font-bold">*</span>
              </div>
              <Textarea
                callback={value => setValue('description', value)}
                placeholder="Informe os requisitos para essa vaga."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </>
  );
}