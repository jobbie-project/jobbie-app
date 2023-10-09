import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {JobCardBig} from '@/components/job-card-big';
import {JobCardMedium} from '@/components/card-medium';
import {useEffect} from 'react';
import authenticationService from '@/services/authentication/authentication.service';
import {useGetJobList} from '@/hooks/useGetJobList';
import {Button} from '@/components/ui/button';

export default function Home() {
  const {jobData} = useGetJobList();

  const data = authenticationService.getUserData();

  useEffect(() => {
    if (!data.id) window.location.href = '/entrar';
  }, [data]);

  return (
    <>
      <Header />
      <div className="max-w-full items-center p-5 flex flex-col">
        <div className="max-w-4xl w-full">
          <p className="my-5 font-normal">Olá, {data.name.split(' ')[0]}</p>
          <div className="flex flex-row">
            <SearchBar placeholder="Procure por vagas, empresas" />
            <Button variant="none" className="h-12 px-10 ml-4 text-sm text-white bg-redDefault">
              Pesquisar
            </Button>
          </div>
          <div className="max-w-4xl flex flex-col w-full ">
            <p className="mt-5 py-6 px-8 font-semibold">Recomendados</p>
            <div className="relative flex mb-5 items-center">
              <div className="px-8 h-full whitespace-nowrap">
                {jobData.jobs.length > 0 &&
                  jobData.jobs.slice(0, 5).map((job, index) => (
                    <div className="inline-block mr-6">
                      <JobCardBig job={job} key={index} code={job.code} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="max-w-5xl flex flex-col w-full">
            <p className="px-8 font-semibold">Vagas recentes</p>
            <div className="px-8 py-6">
              {jobData.jobs.length > 0 &&
                jobData.jobs.map((job, index) => (
                  <div className="mb-5">
                    <JobCardMedium job={job} key={index} code={job.code} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
