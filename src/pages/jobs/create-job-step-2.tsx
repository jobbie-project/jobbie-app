import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {setJobLocation, setJobNumPositions, setJobPosition, setJobSalary, setJobType} from '@/store/slices/job-data';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {useSelector} from 'react-redux';

interface FormData {
  position: string;
  num_positions: string;
  salary: string;
  location: string;
}

export default function CreateJobStep2() {
  const {register, handleSubmit, setValue, reset} = useForm<FormData>();
  const [type, setType] = React.useState<'remote' | 'face-to-face'>();
  const [editMode, setEditMode] = useState(false);
  const jobData = useSelector((state: RootState) => state.jobData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      setType(jobData.type);
      reset({
        position: jobData.position,
        num_positions: jobData.num_positions,
        salary: jobData.salary,
        location: `${jobData.location?.city} ${jobData.location?.state}`,
      });
    }
  }, [jobData]);

  const formatNumberToBRL = (event: string) => {
    const userInput: string = event.replace(/[^0-9]/g, '');
    if (userInput === '') {
      setValue('salary', 'R$ 0,00');
    } else {
      const userInputAsNumber: number = parseInt(userInput, 10) / 100;

      const formattedNumber: string = `R$ ${userInputAsNumber
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')}`;
      setValue('salary', formattedNumber);
    }
  };

  const onSubmit = (data: FormData) => {
    try {
      if (!data.position) throw new Error('Insira o cargo para continuar.');
      dispatch(setJobPosition(data.position));
      if (!data.num_positions) throw new Error('Insira o número de vagas para continuar.');
      dispatch(setJobNumPositions(data.num_positions));
      if (!data.salary) throw new Error('Insira o salário para continuar.');
      dispatch(setJobSalary(data.salary));
      if (!type) throw new Error('Selecione a modalidade da vaga.');
      dispatch(setJobType(type));
      if (type === 'face-to-face' && !data.location) throw new Error('Informe o Local de Trabalho.');
      type === 'face-to-face'
        ? dispatch(setJobLocation({...data, city: data.location.split(',')[0], state: data.location.split(',')[1]}))
        : dispatch(setJobLocation({city: '', state: ''}));
      navigate(params.get('redirect') ?? '/nova-vaga/passo-3');
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
              defaultValue={editMode ? jobData.position : ''}
              required
            />
            <GeneralInput
              register={register}
              registerName="num_positions"
              label="Número de vagas"
              defaultValue={editMode ? jobData.num_positions : ''}
            />
            <GeneralInput
              register={register}
              registerName="salary"
              label="Salário"
              callback={formatNumberToBRL}
              defaultValue={editMode ? jobData.salary : ''}
              required
            />
            <div>
              <div className="font-semibold py-4">Modalidade</div>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => setType('remote')}
                    value="remote"
                    id="r1"
                    checked={type === 'remote'}
                  />
                  <Label htmlFor="r1" className="mt-1">
                    Remoto
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem
                    onClick={() => setType('face-to-face')}
                    value="face-to-face"
                    id="r2"
                    checked={type === 'face-to-face'}
                  />
                  <Label htmlFor="r2" className="mt-1">
                    Presencial
                  </Label>
                </div>
              </RadioGroup>
              {type === 'face-to-face' && (
                <div className="mt-4">
                  <GeneralInput
                    register={register}
                    registerName="location"
                    label="Local de Trabalho"
                    defaultValue={editMode ? `${jobData.location?.city} ${jobData.location?.state}` : ''}
                    required
                  />
                </div>
              )}
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
