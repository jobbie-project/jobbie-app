import {JobCardViewer} from '@/components/job-card-viewer';
import {Job} from '@/interfaces/job';

const mockJob: Job = {
  title: 'Desenvolvedor Front-end',
  company: {
    name: 'Lorem ipsum S/A',
    email: 'mockemail@gmail.com',
    phone: '11 99999-9999',
    document: '99.999.999/9999-99',
    sector: 'Tecnologia',
    address: 'Rua Lorem Ipsum, 9999',
  },
  sector: ['Design'],
  category: 'Estágio',
  description: 'Lorem ipsum dolor sit amet, consectetu',
  salary: 1600,
  modalities: 'Remoto',
  daily_hours: 6,
};

const numberOfJobs = 1;

export default function JobDataViewer() {
  return (
    <>
      {Array(numberOfJobs)
        .fill(0)
        .map((_, index) => (
          <div className="inline-block mr-6 ">
            <JobCardViewer job={mockJob} key={index} />
          </div>
        ))}
    </>
  );
}
