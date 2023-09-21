import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';

export default function JobViewer() {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-xl">
        <BreadCrumbComponent className="m-8" />
      </div>
    </div>
  );
}
