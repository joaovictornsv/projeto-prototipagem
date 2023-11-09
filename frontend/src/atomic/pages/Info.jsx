import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { Button } from "../atoms/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from "../../router/RoutePaths";
import { useRecentWeighings } from "../../hooks/useRecentWeighings";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import moment from "moment";

const options = {
    method: 'open',
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.MEDIUM,
    },
 };

 const getTargetElement = () => document.getElementById('content-id');


export const WeighingStatusLabel = {
    PENDING: {
      label: 'Em andamento',
      color: 'text-yellow-300',
    },
    DONE: {
      label: 'Concluída',
      color: 'text-teal-300',
    },
  };


export const Info = () => {
    const navigate = useNavigate();
    const { isLoading, weighings } = useRecentWeighings();
    const { id } = useParams();

    const result = weighings.filter((weighing) => weighing._id == id);

    return (
      <div className="mx-auto mt-16 flex h-full w-full px-6 pb-16 max-w-[1000px] flex-col gap-12" >
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
        ) : !weighings.length ? (
          <h3 className="text-center text-xl font-bold">
            Sem informações recentes.
          </h3>
        ) : (
          <div className="flex flex-col bg-white gap-4" id={"content-id"}>
            <h1 className="text-center text-3xl font-bold text-black" >Informações da Pesagem</h1>
            {result.map((weighing) => (
                id == weighing._id ? 
            <div className="rounded bg-white p-4" key={weighing._id}>
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                <span className="font-bold  text-black">
                    {weighing.vehicle_model}
                    {' - '}
                    <span className="opacity-70  text-black">{weighing.vehicle_year}</span>
                  </span>
                  <span className=" text-black">Placa {weighing.license_plate_number}</span>
                  <span className=" text-black">Motorista: {weighing.driver_name}</span>
                  <span className=" text-black">Documento do motorista: {weighing.driver_document_number}</span>
                  
                  <span className="opacity-80  text-black">{weighing.company}</span>
                  <span className="opacity-80  text-black">
                    Carga: {weighing.load_weight}kg
                  </span>
                  <span className="opacity-80  text-black">
                    Peso Carregado: {weighing.full_load_weight}kg
                  </span>
                  <span className="opacity-80  text-black">
                    Peso Descarregado: {weighing.unload_weight}kg
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2 text-black">
                <span className="opacity-80 text-black">
                    {moment(weighing.createdAt).format('hh:mm DD/MM/YYYY')}
                  </span>
                  <span className={WeighingStatusLabel[weighing.status].color}>
                    {WeighingStatusLabel[weighing.status].label}
                  </span>
                  {/* <Button 
                    icon={faDownload}
                    className="w-max items-end"
                    onClick={() => generatePDF(getTargetElement, options)} /> */}
                </div>
              </div>
            </div> : <div></div>
          ))}
          </div>
        )}
        <div className="text-center text-3xl font-bold text-black">
          <Button 
            icon={faDownload}
            text=" Download "
            className="w-max items-end"
            onClick={() => generatePDF(getTargetElement, options)}/>
        </div>
      </div>
    );
  };