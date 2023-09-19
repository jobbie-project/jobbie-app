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

interface FormData {
  company_name: string;
  owner: string;
  owner_email: string;
}

export default function CreateJobStep1() {
  const {register, handleSubmit, reset} = useForm<FormData>();
  const [editMode, setEditMode] = useState(false);
  const jobData = useSelector((state: RootState) => state.jobData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get('editar') !== null && !!params.get('editar')) {
      setEditMode(true);
      reset({
        company_name: jobData.company_name,
        owner: jobData.owner,
        owner_email: jobData.owner_email,
      });
    }
  }, [jobData]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.company_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobCompanyName(data.company_name));
      if (!data.owner) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobOwner(data.owner));
      if (!data.owner_email) throw new Error('Insira seu email para continuar.');
      dispatch(setJobOwnerEmail(data.owner_email));
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
              registerName="owner"
              label="Responsável pela vaga"
              defaultValue={editMode ? jobData.owner : ''}
              required
            />
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
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonHover text={'Continuar'} type={'submit'} className="font-semibold text-base" />
          </div>
        </form>
      </div>
    </>
  );
}
