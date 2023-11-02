import {Header} from '@/components/header';
import BreadCrumbComponent from '@/components/breadcrumb';
import {AvailableIcon} from '@/icons/available';
import {RolesIcon} from '@/icons/roles';
import {ClosedIcon} from '@/icons/closed';
import {useGetJobList} from '@/hooks/useGetJobList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {JobCardMedium} from '@/components/card-medium';
import {JobStatus} from '@/utils/consts';

export default function MyApplications() {
  const {jobData} = useGetJobList();
  const half = Math.ceil(jobData.jobs.length / 2);
  const firstColumn = jobData.jobs.slice(0, half);
  const secondColumn = jobData.jobs.slice(half);

  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full py-6">
          <div className="">
            <BreadCrumbComponent className="my-8" />
            <div className="flex justify-between">
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.total}</p>
                    <p className="text-sm text-black mt-2">Candidaturas</p>
                  </div>
                  <RolesIcon width="52" height="52" />
                </div>
              </div>
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.open}</p>
                    <p className="text-sm text-black mt-2">Em aberto</p>
                  </div>
                  <AvailableIcon width="52" height="52" />
                </div>
              </div>
              <div className="w-72 h-28 bg-white border-2 border-lightgray1 rounded-md">
                <div className="p-6 flex justify-between">
                  <div>
                    <p className="font-semibold text-3xl">{jobData.closed}</p>
                    <p className="text-sm text-black mt-2">Finalizadas</p>
                  </div>
                  <ClosedIcon width="52" height="52" />
                </div>
              </div>
            </div>
            <div>
              <p className="mt-8 font-semibold">Suas últimas candidaturas</p>
              <div className="flex flex-row justify-between">
                <div className="py-6 w-full">
                  {firstColumn.map((job, index) => (
                    <div className="mb-5">
                      <JobCardMedium job={job} key={index} code={job.code} isClosed={job.status === 'closed'} />
                    </div>
                  ))}
                </div>
                <div className="py-6 w-full">
                  {secondColumn.map((job, index) => {
                    return (
                      <div className="mb-5 ml-5">
                        <JobCardMedium job={job} key={index} code={job.code} isClosed={job.status === 'closed'} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-4 mb-12 justify-center">
              <Stack spacing={2}>
                <Pagination count={jobData.total / 5} shape="rounded" />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
