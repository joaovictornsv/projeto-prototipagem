import { Button } from '../atoms/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths.js';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import moment from 'moment';
import { useRecentWeighings } from '../../hooks/useRecentWeighings.js';

export const WeighingStatusLabel = {
  WAITING_WEIGHT_CONFIRMATION: {
    label: 'Aguardando confirmação de pesagem',
    color: 'text-yellow-300',
  },
  PENDING: {
    label: 'Pesagem em andamento',
    color: 'text-yellow-300',
  },
  DONE: {
    label: 'Pesagem concluída',
    color: 'text-teal-300',
  },
};

export const Recent = () => {
  const navigate = useNavigate();
  const { isLoading, weighings } = useRecentWeighings();

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-start justify-between gap-2">
        <Button
          type="ghost"
          icon={faArrowLeft}
          text="Voltar"
          className="w-max"
          onClick={() => navigate(RoutePaths.HOME)}
        />

        <h1 className="text-center text-3xl font-bold">Pesagens recentes</h1>
      </div>

      {isLoading ? (
        <h3 className="text-center text-xl font-bold">Carregando...</h3>
      ) : !weighings.length ? (
        <h3 className="text-center text-xl font-bold">
          Sem pesagens recentes.
        </h3>
      ) : (
        <div className="flex flex-col gap-4">
          {weighings.map((weighing) => (
            <div className="rounded bg-zinc-900 p-4" key={weighing._id}>
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  {/* <span className="font-bold">
                    {weighing.vehicle_model}
                    {' - '}
                    <span className="opacity-70">{weighing.vehicle_year}</span>
                  </span> */}
                  <span>Placa {weighing.license_plate_number}</span>
                  {/* <span>Motorista: {weighing.driver_name}</span>
                  <span className="opacity-80">{weighing.company}</span> */}
                  <span className="opacity-80">
                    Carga: {weighing.load_weight}kg
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="opacity-80">
                    {moment(weighing.createdAt).format('hh:mm DD/MM/YYYY')}
                  </span>
                  <span className={WeighingStatusLabel[weighing.status].color}>
                    {WeighingStatusLabel[weighing.status].label}
                  </span>
                  <Button 
                    icon={faSearch}
                    className="w-max items-end"
                    onClick={() => navigate(RoutePaths.RECENT + '/' + weighing._id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
