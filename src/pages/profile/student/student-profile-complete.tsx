import {Header} from '@/components/header';

export default function StudentProfileComplete() {
  return (
    <div className="select-none">
      <Header />
      <div className="max-w-full  items-center flex flex-col ">
        <div className="max-w-sm w-full flex flex-row justify-center m-auto">
          <div className="font-semibold">Seu perfil está completo!</div>
        </div>
      </div>
    </div>
  );
}
