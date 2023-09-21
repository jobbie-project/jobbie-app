import BreadCrumbComponent from '@/components/breadcrumb';
import {Header} from '@/components/header';
import {SearchBar} from '@/components/searchbar';
import {Button} from '@/components/ui/button';

export default function JobViewer() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <BreadCrumbComponent className="my-8" />
          <div className="flex flex-row">
            <SearchBar showFilter />
            <Button variant="none" className="ml-4 h-12 px-6 text-white bg-redDefault">
              Pesquisar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
