import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {setJobCompanyName, setJobOwner, setJobOwnerEmail} from '@/store/slices/job-data';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button} from '@/components/ui/button';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import * as EmailValidator from 'email-validator';
interface FormData {
  company_name: string;
  owner_name?: string;
  owner_email: string;
}

export default function CreateJobStep1() {
  const {register, handleSubmit, reset} = useForm<FormData>();
  const [editMode, setEditMode] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const jobData = useSelector((state: RootState) => state.jobData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        company_name: jobData.company_name,
        owner_name: jobData.owner_name,
        owner_email: jobData.owner_email,
      });
    }
  }, [jobData]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.company_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobCompanyName(data.company_name));
      if (!data.owner_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobOwner(data.owner_name));
      if (!isSorting) {
        if (!data.owner_email) throw new Error('Insira seu email para continuar.');
        if (!EmailValidator.validate(data.owner_email)) throw new Error('Insira um email válido');
        dispatch(setJobOwnerEmail(data.owner_email ?? ''));
      }
      navigate(params.get('redirect') ?? '/nova-vaga/passo-2');
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <RegisterHeader showProgress={{progress: 1, maxSteps: 4.5}} text="Conclua os passos para publicação da vaga." />
      <div className="py-6 flex justify-center ">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
          <div className="font-semibold mt-4 text-lg select-none">
            Preencha os dados abaixo para recebimento dos currículos dos candidatos
          </div>
          <div className="mt-8 w-full">
            <GeneralInput
              register={register}
              registerName="company_name"
              label="Nome da empresa"
              defaultValue={editMode ? jobData.company_name : ''}
              required
            />
            <GeneralInput
              register={register}
              registerName="owner_name"
              label="Responsável pela vaga"
              defaultValue={editMode ? jobData.owner_name : ''}
            />
            <div className="font-semibold py-4">Candidaturas</div>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem onClick={() => setIsSorting(true)} value="triagem" id="r1" checked={isSorting} />
                <Label htmlFor="r1" className="mt-1">
                  Triagem prévia dos currículos
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem onClick={() => setIsSorting(false)} value="direc" id="r2" checked={!isSorting} />
                <Label htmlFor="r2" className="mt-1">
                  Enviar diretamente para o email
                </Label>
              </div>
            </RadioGroup>
            {!isSorting && (
              <>
                <GeneralInput
                  register={register}
                  registerName="owner_email"
                  label="Email"
                  defaultValue={editMode ? jobData.owner_email : ''}
                  required
                />
                <span className="text-xs text-gray-400 select-none">
                  os currículos dos candidatos serão enviados para o email que você fornecer acima.
                </span>
              </>
            )}
          </div>
          <div className="mt-8 flex flex-row justify-between">
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
