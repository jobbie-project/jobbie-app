import React from 'react';
import RegisterHeader from '@/components/register-header';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {toastError} from '@/utils/toast-error';
import {GeneralButton} from '@/components/general-button';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const [userType, setUserType] = React.useState<'student' | 'company'>();
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (!userType) throw new Error('Selecione um tipo de usuário.');
      navigate(`${userType === 'student' ? `/registro/estudante` : `/registro/empresa`}`);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <>
      <RegisterHeader />
      <div className="max-w-full items-center p-5 flex flex-col  px-6">
        <div className="max-w-xl w-full font-normal text-base text-black">
          <div className=" mt-24 w-full font-semibold text-xl text-black">Boas vindas.</div>
          <p className="mt-6">Tudo pronto para dar o próximo passo?</p>

          <div className="inline-block mt-10 w-full">
            <RadioGroup defaultValue="option">
              <div className="flex items-center space-x-2">
                <RadioGroupItem onClick={() => setUserType('student')} value="student" id="r1" />
                <Label htmlFor="r1">Candidato</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem onClick={() => setUserType('company')} value="company" id="r2" />
                <Label htmlFor="r2">Empresa</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mt-6 w-full">
            <GeneralButton type="submit" text="Continuar" callback={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
}
