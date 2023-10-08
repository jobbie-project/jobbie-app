import {Badge} from './ui/badge';
import {Button} from './ui/button';

export default function CardLarge() {
  return (
    <div>
      <div className="w-full rounded-md px-7 bg-lightgray1">
        <div className="flex flex-row justify-between">
          <p className="pt-7 text-lg font-semibold">Desenvolvedor Front-End</p>
          <div className="flex flex-row justify-between mt-7">
            <Badge variant="default" className="mr-4">
              Estágio
            </Badge>
            <Badge variant="default">Remoto</Badge>
          </div>
        </div>
        <p className="text-xs">Lorem Ipsum S/A</p>
        <div className="mt-8 mb-7 pb-7 flex flex-row justify-between">
          <div className="font-semibold flex flex-row items-end">
            R$ 2200 <div className="text-xs font-normal flex items-end mb-[2px]">/Mensal</div>
          </div>
          <Button variant="none" className="px-8 rounded-md bg-redDefault text-white flex flex-row items-center">
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
}
