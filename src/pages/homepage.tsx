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
    <div>
      <Header />
      <div className="max-w-full items-center py-5 flex flex-col text-sm">
        <div className="max-w-4xl w-full">
          <p className="my-5 font-normal">Olá, {data.name.split(' ')[0]}</p>
          <div className="flex flex-row">
            <SearchBar placeholder="Procure por vagas, empresas" />
            <Button variant="none" className="h-12 px-10 ml-4 text-sm text-white bg-redDefault">
              Pesquisar
            </Button>
          </div>
          <div className="flex flex-col w-full">
            <p className="mt-5 py-6 font-semibold">Recomendados</p>
            <div className="relative flex mb-5 items-center">
              <div className="max-w-5xl grid grid-cols-3 gap-4">
                {jobData.jobs.length > 0 &&
                  jobData.jobs.slice(0, 6).map((job, index) => (
                    <div className="inline-block ">
                      <JobCardBig job={job} key={index} code={job.code} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="max-w-5xl flex flex-col w-full">
            <p className="font-semibold">Vagas recentes</p>
            <div className="py-6">
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
    </div>
  );
}
