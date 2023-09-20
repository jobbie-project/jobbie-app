import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import RegisterHeader from '@/components/register-header';
import {ButtonHover} from '@/components/button-hover-animation';
import {ContractTypes, JobTime} from '@/utils/consts';
import Textarea from '@/components/ui/textarea';
import {SelectDropdown} from '@/components/select-dropdown';
import {setJobContractType, setJobDescription, setJobTime} from '@/store/slices/job-data';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button} from '@/components/ui/button';

interface FormData {
  description: string;
  time: string;
  contract_type: string;
}

export default function CreateJobStep3() {
  const {handleSubmit, setValue, watch, reset} = useForm<FormData>();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const jobData = useSelector((state: RootState) => state.jobData);

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        description: jobData.description,
        time: jobData.time,
        contract_type: jobData.contract_type,
      });
    }
  }, [jobData]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.contract_type) throw new Error('Insira o Tipo da Vaga.');
      dispatch(setJobContractType(data.contract_type));
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
          <div className="font-semibold mt-4 text-base select-none">
            Adicione os detalhes da vaga para encontrar seu próximo colaborador.
          </div>
          <div className="mt-8 w-full">
            <SelectDropdown
              className="text-black"
              callback={value => setValue('contract_type', value)}
              value={watch('contract_type')}
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
                defaultValue={editMode ? jobData.description : ''}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-row justify-between">
            <Button
              onClick={() => navigate('/gerenciamento')}
              className=" bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
              Cancelar
            </Button>
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </>
  );
}
