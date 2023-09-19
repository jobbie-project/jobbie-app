import {useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {setJobLocation, setJobNumPositions, setJobPosition, setJobSalary, setJobType} from '@/store/slices/job-data';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import React from 'react';
import {Label} from '@/components/ui/label';

interface FormData {
  position: string;
  num_positions: string;
  salary: string;
  location: string;
}

export default function CreateJobStep2() {
  const {register, handleSubmit, setValue} = useForm<FormData>();
  const [location, setLocation] = React.useState<'remote' | 'face-to-face'>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const formatNumberToBRL = (event: string) => {
    let userInput: string = event.replace(/[^0-9]/g, '');
    if (userInput === '') {
      setValue('salary', 'R$ 0,00');
    } else {
      let userInputAsNumber: number = parseInt(userInput, 10) / 100;

      let formattedNumber: string = `R$ ${userInputAsNumber
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
      if (!location) throw new Error('Selecione a modalidade da vaga.');
      location === 'remote' ? dispatch(setJobType('Remoto')) : dispatch(setJobType('Presencial'));
      if (location === 'face-to-face' && !data.location) throw new Error('Informe o Local de Trabalho.');
      if (location === 'face-to-face')
        dispatch(setJobLocation({...data, city: data.location.split(',')[0], state: data.location.split(',')[1]}));
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
            <GeneralInput register={register} registerName="position" label="Cargo" required />
            <GeneralInput register={register} registerName="num_positions" label="Número de vagas" />
            <GeneralInput
              register={register}
              registerName="salary"
              label="Salário"
              callback={formatNumberToBRL}
              required
            />
            <div>
              <div className="font-semibold py-4">Modalidade</div>
              <RadioGroup defaultValue="option">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem onClick={() => setLocation('remote')} value="remote" id="r1" />
                  <Label htmlFor="r1" className="mt-1">
                    Remoto
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem onClick={() => setLocation('face-to-face')} value="ftf" id="r2" />
                  <Label htmlFor="r2" className="mt-1">
                    Presencial
                  </Label>
                </div>
              </RadioGroup>
              {location === 'face-to-face' && (
                <div className="mt-4">
                  <GeneralInput register={register} registerName="location" label="Local de Trabalho" required />
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