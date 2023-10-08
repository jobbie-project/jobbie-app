import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {JobCardBig} from '@/components/job-card-big';
import {JobCardMedium} from '@/components/card-medium';
import {Job} from '@/interfaces/job';
import {useEffect} from 'react';
import authenticationService from '@/services/authentication/authentication.service';
import {useJobData} from '@/hooks/useJobData';

export default function Home() {
  const {jobData} = useJobData();

  const username = 'Usuário';
  const data = authenticationService.getUserData();

  useEffect(() => {
    if (!data.id) window.location.href = '/entrar';
  }, [data]);

  return (
    <>
      <Header />
      <div className="max-w-full items-center p-5 flex flex-col ">
        <div className="max-w-5xl px-8 w-full ">
          <p className="my-5 font-normal">Olá, {username}</p>
          <SearchBar placeholder="Procure por vagas, empresas" showFilter />
        </div>
        <div className="max-w-5xl flex flex-col w-full ">
          <p className="mt-5 py-6 px-8 font-semibold">Recomendados</p>
          <div className="relative flex mb-5 items-center">
            <div className="px-8  max-w-5xl h-full bg- overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              {jobData.jobs.length > 0 &&
                jobData.jobs.map((job, index) => (
                  <div className="inline-block mr-6 ">
                    <JobCardBig job={job} key={index} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="max-w-5xl flex flex-col w-full ">
          <p className="px-8 font-semibold">Vagas recentes</p>
          <div className="px-8 py-6">
            {jobData.jobs.length > 0 &&
              jobData.jobs.map((job, index) => (
                <div className="mb-5">
                  <JobCardMedium job={job} key={index} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
