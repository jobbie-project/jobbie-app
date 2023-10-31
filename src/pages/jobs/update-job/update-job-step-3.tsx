import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import RegisterHeader from '@/components/register-header';
import {ButtonHover} from '@/components/button-hover-animation';
import {ContractTypes, JobTimes} from '@/utils/consts';
import Textarea from '@/components/ui/textarea';
import {SelectDropdown} from '@/components/select-dropdown';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button} from '@/components/ui/button';
import {ContractType, JobTime} from '@/enums';
import {
  setUpdateJobContractType,
  setUpdateJobDescription,
  setUpdateJobTagName,
  setUpdateJobTime,
} from '@/store/slices/update-job-data';

interface FormData {
  description: string;
  time: JobTime;
  contract_type: ContractType;
  job_tag: string;
}

export default function UpdateJobStep3() {
  const {handleSubmit, setValue, watch, reset} = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const jobData = useSelector((state: RootState) => state.updateJobData);
  const {fatec_course} = useSelector((state: RootState) => state.fatecDataSlice);

  useEffect(() => {
    reset({
      description: jobData.description,
      time: jobData.job_time,
      contract_type: jobData.contract_type,
      job_tag: jobData.job_tag,
    });
  }, [jobData]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.contract_type) throw new Error('Insira o Tipo da Vaga.');
      dispatch(setUpdateJobContractType(data.contract_type));
      if (!data.time) throw new Error('Insira o Horário de Trabalho.');
      dispatch(setUpdateJobTime(data.time));
      if (!data.description) throw new Error('Insira a Descrição da Vaga.');
      dispatch(setUpdateJobDescription(data.description));
      if (!data.job_tag) throw new Error('Insira a qual curso a vaga se destina');
      dispatch(setUpdateJobTagName(data.job_tag));
      const code = params.get('codigo') ?? '';
      navigate(`${params.get('redirect')}&codigo=${code}`);
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
          <SelectDropdown
            className="text-black"
            callback={value => {
              setValue('job_tag', value);
            }}
            value={watch('job_tag')}
            label={'Selecione o Curso da Vaga'}
            options={fatec_course}
          />
          <div className="mt-8 w-full">
            <SelectDropdown
              className="text-black"
              callback={value => setValue('contract_type', value as ContractType)}
              value={watch('contract_type')}
              label={'Selecione o Tipo da Vaga'}
              options={ContractTypes}
            />
            <SelectDropdown
              className="text-black"
              callback={value => setValue('time', value as JobTime)}
              value={watch('time')}
              label={'Selecione o Horário de Trabalho'}
              options={JobTimes}
            />
            <div className="mt-6">
              <div className="text-sm font-semibold my-2">
                Descrição da vaga<span className="text-redDefault font-bold">*</span>
              </div>
              <Textarea
                callback={value => setValue('description', value)}
                placeholder="Informe os requisitos e benefícios para essa vaga."
                defaultValue={jobData.description}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-row justify-between">
            <Button
              onClick={() => navigate('/gerenciamento')}
              className="bg-lightgray1 font-semibold text-black hover:bg-redDefault hover:text-white">
              Cancelar
            </Button>
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </>
  );
}
