import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { Button } from '../atoms/Button';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import generatePDF, { Margin } from 'react-to-pdf';
import moment from 'moment';
import { WeighingStatusLabel } from './Recent.jsx';
import { useWeighingData } from '../../hooks/useWeighingData.js';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { RoutePaths } from '../../router/RoutePaths.js';

const getTargetElement = () => document.getElementById('content-id');

function WeighingTicketContent({ weighing }) {
  return (
    <div className="flex w-max flex-col gap-4 text-black" id={'content-id'}>
      <h1 className="text-2xl font-bold">Informações da Pesagem</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-lg font-bold">Dados da pesagem</h1>
          <span className="opacity-80">
            Iniciada em: {moment(weighing.createdAt).format('HH:mm DD/MM/YYYY')}
          </span>
          <span className="opacity-80">Carga: {weighing.load_weight}kg</span>
          <span className="opacity-80">
            Peso Carregado: {weighing.full_load_weight}kg
          </span>
          <span className="opacity-80">
            Peso Descarregado: {weighing.unload_weight}kg
          </span>
          <span className="opacity-80">
            Situação: {WeighingStatusLabel[weighing.status].label}
          </span>
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="text-lg font-bold">Dados do veículo</h1>
          <span className="opacity-80">
            Modelo: {weighing.vehicle_model}, {weighing.vehicle_year}
          </span>
          <span className="opacity-80">
            Placa: {weighing.license_plate_number}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">Dados do motorista</h1>
          <span className="opacity-80">Motorista: {weighing.driver_name}</span>
          <span className="opacity-80">
            Nº do documento: {weighing.driver_document_number}
          </span>
          <span className="opacity-80">Empresa: {weighing.company}</span>
        </div>
      </div>
      <hr className="border-black" />
      <p className="text-small pb-3">
        Ticket emitido em Campina Grande,{' '}
        {moment(new Date()).format('HH:mm DD/MM/YYYY')}
      </p>
    </div>
  );
}

export const Ticket = () => {
  const navigate = useNavigate();
  const { weighingId } = useParams();
  const { isLoading, weighing } = useWeighingData(weighingId);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-2">
        <Button
          type="ghost"
          icon={faArrowLeft}
          text="Voltar"
          className="w-max"
          onClick={() =>
            navigate(generatePath(RoutePaths.INFO, { weighingId }))
          }
        />
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="text-3xl font-bold">Ticket</h1>

          {weighing && WeighingStatusLabel[weighing.status].isDone && (
            <Button
              icon={faDownload}
              text="Download"
              className="w-max"
              onClick={() =>
                generatePDF(getTargetElement, {
                  method: 'open',
                  page: {
                    // margin is in MM, default is Margin.NONE = 0
                    margin: Margin.SMALL,
                    format: 'A6',
                  },
                })
              }
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <h3 className="text-center text-xl font-bold">Carregando...</h3>
      ) : !weighing ? (
        <h3 className="text-center text-xl font-bold">
          Pesagem não encontrada.
        </h3>
      ) : (
        <div className="rounded bg-white p-4">
          <WeighingTicketContent weighing={weighing} />
        </div>
      )}
    </div>
  );
};
