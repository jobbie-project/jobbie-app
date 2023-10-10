import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {setJobCompanyName, setJobOwner, setJobOwnerEmail} from '@/store/slices/job-data';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useGetJobData} from '@/hooks/useGetJobData';

interface FormData {
  company_name: string;
  owner_name?: string;
  owner_email: string;
}

export default function UpdateJobStep1() {
  const {register, handleSubmit, reset} = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const {job} = useGetJobData(params.get('codigo') ?? '');

  useEffect(() => {
    if (job) {
      reset({
        company_name: job.company_name,
        owner_name: job.owner_name,
        owner_email: job.owner_email,
      });
    }
  }, [job]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.company_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobCompanyName(data.company_name));
      if (!data.owner_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setJobOwner(data.owner_name));
      dispatch(setJobOwnerEmail(data.owner_email ?? ''));
      const code = params.get('codigo') ?? '';
      navigate(`/vaga/editar/passo-2?codigo=${code}`);
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
              defaultValue={job?.company_name}
              required
            />
            <GeneralInput
              register={register}
              registerName="owner_name"
              label="Responsável pela vaga"
              defaultValue={job?.owner_name}
            />
            <GeneralInput
              register={register}
              registerName="owner_email"
              label="Email"
              defaultValue={job?.owner_email}
              required
            />
            <span className="text-xs text-gray-400 select-none">
              os currículos dos candidatos serão enviados para o email que você fornecer acima.
            </span>
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
