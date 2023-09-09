import {AddNewButton} from '@/components/add-new-button';
import {ButtonHover} from '@/components/button-hover-animation';
import RegisterHeader from '@/components/register-header';
import {ReviewCardSmall} from '@/components/review-card-small';
import {RootState, useAppDispatch} from '@/store/store';
import {setUserCertifications} from '@/store/slices/profile-data';
import {Input} from '@/components/ui/input';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function StudentRegisterStep7() {
  const navigate = useNavigate();
  const {certifications} = useSelector((state: RootState) => state.profileData);
  const [certification, setCertification] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    navigate('/estudante/perfil/revisar');
  };

  return (
    <div>
      <RegisterHeader showProgress={{progress: 6, maxSteps: 8}} />
      <div className="max-w-full items-center p-5 flex flex-col min-h-screen mt-6">
        <div className="max-w-sm w-full">
          <p className="text-black font-semibold text-lg select-none mt-4 mb-4">
            Quais certificações ou licenças você tem?
          </p>
          {certifications.map((item, index) => (
            <ReviewCardSmall index={index} key={index} canDelete={true} canEdit={true} title={item} />
          ))}
          <div className="flex justify-between mt-4">
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertification(e.target.value)}
              type="text"
              value={certification}
              placeholder="Adicione uma certificação ou licença"
              className="bg-lightgray1 border-none"
            />
            <div className="ml-4">
              <AddNewButton
                onClick={() => {
                  setCertification('');
                  dispatch(setUserCertifications(certification));
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonHover callback={onSubmit} text={'Continuar'} type={'submit'} className="font-semibold text-base" />
        </div>
      </div>
    </div>
  );
}
