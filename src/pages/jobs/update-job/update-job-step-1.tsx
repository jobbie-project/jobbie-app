import {RootState, useAppDispatch} from '@/store/store';
import {toastError} from '@/utils/toast-error';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import RegisterHeader from '@/components/register-header';
import GeneralInput from '@/components/general-input';
import {ButtonHover} from '@/components/button-hover-animation';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Button} from '@/components/ui/button';
import {setUpdateJobCompanyName, setUpdateJobOwner, setUpdateJobOwnerEmail} from '@/store/slices/update-job-data';

interface FormData {
  company_name: string;
  owner_name?: string;
  owner_email: string;
}

export default function UpdateJobStep1() {
  const {register, handleSubmit, reset} = useForm<FormData>();
  const jobData = useSelector((state: RootState) => state.updateJobData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  useEffect(() => {
    reset({
      company_name: jobData.company_name,
      owner_name: jobData.owner_name,
      owner_email: jobData.owner_email,
    });
  }, [jobData]);

  const onSubmit = (data: FormData) => {
    try {
      if (!data.company_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setUpdateJobCompanyName(data.company_name));
      if (!data.owner_name) throw new Error('Insira seu nome para continuar.');
      dispatch(setUpdateJobOwner(data.owner_name));
      dispatch(setUpdateJobOwnerEmail(data.owner_email ?? ''));
      const code = params.get('codigo') ?? '';
      navigate(`${params.get('redirect')}&codigo=${code}`);
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
              defaultValue={jobData.company_name}
              required
            />
            <GeneralInput
              register={register}
              registerName="owner_name"
              label="Responsável pela vaga"
              defaultValue={jobData.owner_name}
            />
            <GeneralInput
              register={register}
              registerName="owner_email"
              label="Email"
              defaultValue={jobData.owner_email}
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
