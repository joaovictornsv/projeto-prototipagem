import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { Button } from '../atoms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths';
import generatePDF, { Margin } from 'react-to-pdf';
import moment from 'moment';
import { WeighingStatusLabel } from './Recent.jsx';
import { useWeighingData } from '../../hooks/useWeighingData.js';

const options = {
  method: 'open',
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.MEDIUM,
  },
};

const getTargetElement = () => document.getElementById('content-id');

function WeighingTicketContent({ weighing }) {
  return (
    <div className="flex flex-col gap-4" id={'content-id'}>
      <h1 className="text-center text-3xl font-bold">Informações da Pesagem</h1>
      <div className="rounded p-4" key={weighing._id}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-bold">
              {weighing.vehicle_model}
              {' - '}
              <span>{weighing.vehicle_year}</span>
            </span>
            <span>Placa {weighing.license_plate_number}</span>
            <span>Motorista: {weighing.driver_name}</span>
            <span>
              Documento do motorista: {weighing.driver_document_number}
            </span>

            <span className="opacity-80">{weighing.company}</span>
            <span className="opacity-80">Carga: {weighing.load_weight}kg</span>
            <span className="opacity-80">
              Peso Carregado: {weighing.full_load_weight}kg
            </span>
            <span className="opacity-80">
              Peso Descarregado: {weighing.unload_weight}kg
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="opacity-80">
              {moment(weighing.createdAt).format('hh:mm DD/MM/YYYY')}
            </span>
            <span className={WeighingStatusLabel[weighing.status].color}>
              {WeighingStatusLabel[weighing.status].label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Info = () => {
  const navigate = useNavigate();
  const { weighingId } = useParams();
  const { isLoading, weighing } = useWeighingData(weighingId);

  return (
    <div className="mx-auto mt-16 flex h-full w-full max-w-[1000px] flex-col gap-12 px-6 pb-16">
      <div className="flex flex-col items-start justify-between gap-2">
        <Button
          type="ghost"
          icon={faArrowLeft}
          text="Voltar"
          className="w-max"
          onClick={() => navigate(RoutePaths.RECENT)}
        />
      </div>

      {isLoading ? (
        <h3 className="text-center text-xl font-bold">Carregando...</h3>
      ) : !weighing ? (
        <h3 className="text-center text-xl font-bold">
          Sem informações recentes.
        </h3>
      ) : (
        <>
          <WeighingTicketContent weighing={weighing} />
          {WeighingStatusLabel[weighing.status].isDone && (
            <div className="text-center">
              <Button
                icon={faDownload}
                text="Download"
                className="w-max"
                onClick={() => generatePDF(getTargetElement, options)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
