import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {useSelector} from 'react-redux';
import {Button} from '@/components/ui/button';
import {JobType} from '@/enums';
import InputMask from 'react-input-mask';
import {
  setUpdateJobLocation,
  setUpdateJobNumPositions,
  setUpdateJobPosition,
  setUpdateJobSalary,
  setUpdateJobType,
} from '@/store/slices/update-job-data';
import {Money} from '@/utils/money';

interface FormData {
  position: string;
  num_positions: string;
  salary: string;
  location: string;
}

export default function UpdateJobStep2() {
  const {register, handleSubmit, setValue, reset} = useForm<FormData>();
  const [type, setType] = React.useState<JobType>();
  const jobData = useSelector((state: RootState) => state.updateJobData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    setType(jobData.type as JobType);
    reset({
      position: jobData.position,
      num_positions: jobData.num_positions,
      salary: formatNumberToBRL(`${jobData.salary}`, true),
      location: `${jobData.location?.city} ${jobData.location?.state}`,
    });
  }, [jobData]);

  const formatNumberToBRL = (event: string, firstRender?: boolean) => {
    const userInputOnlyNumbers: string = event.replace(/[^0-9]/g, '');
    const value = firstRender ? parseFloat(userInputOnlyNumbers) : parseFloat(userInputOnlyNumbers) / 100;
    const userInputFormatted = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    setValue('salary', userInputFormatted);
    return userInputFormatted;
  };

  const onSubmit = (data: FormData) => {
    try {
      if (!data.position) throw new Error('Insira o cargo para continuar.');
      dispatch(setUpdateJobPosition(data.position));
      if (Number.isNaN(Number(data.num_positions))) throw new Error('Número de vagas inválido');
      data.num_positions && dispatch(setUpdateJobNumPositions(data.num_positions));
      if (!data.salary) throw new Error('Insira o salário para continuar.');
      const formattedSalary = parseFloat(data.salary.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      console.log(data.salary, formattedSalary);
      dispatch(setUpdateJobSalary(formattedSalary));
      if (!type) throw new Error('Selecione a modalidade da vaga.');
      dispatch(setUpdateJobType(type as JobType));
      if (type === JobType.FACE_TO_FACE && !data.location) throw new Error('Informe o Local de Trabalho.');
      type === JobType.FACE_TO_FACE
        ? dispatch(
            setUpdateJobLocation({...data, city: data.location.split(',')[0], state: data.location.split(',')[1]}),
          )
        : dispatch(setUpdateJobLocation({city: '', state: ''}));
      const code = params.get('codigo') ?? '';
      navigate(`${params.get('redirect')}&codigo=${code}`);
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <RegisterHeader showProgress={{progress: 2, maxSteps: 4.5}} text="Conclua os passos para publicação da vaga." />
      <div className="py-6 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
          <div className="font-semibold mt-4 text-lg select-none">
            Informe os dados básicos da vaga que você está criando.
          </div>
          <div className="mt-8 w-full">
            <GeneralInput
              register={register}
              registerName="position"
              label="Cargo"
              defaultValue={jobData.position}
              required
            />
            <GeneralInput
              register={register}
              registerName="num_positions"
              label="Número de vagas"
              defaultValue={jobData.num_positions}
            />
            <GeneralInput
              register={register}
              registerName="salary"
              label="Salário"
              callback={formatNumberToBRL}
              defaultValue={`${jobData.salary}`}
              required
            />
            <div>
              <div className="font-semibold py-4">Modalidade</div>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => setType(JobType.REMOTE)}
                    value="remote"
                    id="r1"
                    checked={type === JobType.REMOTE}
                  />
                  <Label htmlFor="r1" className="mt-1">
                    Remoto
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem
                    onClick={() => setType(JobType.FACE_TO_FACE)}
                    value="face-to-face"
                    id="r2"
                    checked={type === JobType.FACE_TO_FACE}
                  />
                  <Label htmlFor="r2" className="mt-1">
                    Presencial
                  </Label>
                </div>
              </RadioGroup>
              {type === JobType.FACE_TO_FACE && (
                <div className="mt-4">
                  <GeneralInput
                    register={register}
                    registerName="location"
                    label="Local de Trabalho"
                    defaultValue={`${jobData.location?.city} ${jobData.location?.state}`}
                    required
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flex flex-row justify-between">
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
