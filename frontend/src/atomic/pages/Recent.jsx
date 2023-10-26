import {Button} from "../atoms/Button.jsx";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RoutePaths.js";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {useEffect, useState} from "react";
import {getRecentWeighings} from "../../utils/api.js";
import moment from 'moment';

export const WeighingStatusLabel = {
  PENDING: {
    label: 'Em andamento',
    color: 'text-yellow-300'
  },
  DONE: {
    label: 'Concluída',
    color: 'text-teal-300'
  }
}

export const Recent = () => {
  const navigate = useNavigate()
  const [weighings, setWeighings] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getRecentWeighings()
      .then((data) => {
        setIsLoading(false)
        setWeighings(data)
      })
      .catch((e) => console.error(e))

  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      <div
        className="flex flex-col items-start justify-between gap-2"
      >
        <Button
          type="ghost"
          icon={faArrowLeft}
          text="Voltar"
          className="w-max"
          onClick={() => navigate(RoutePaths.HOME)}
        />

        <h1 className="text-3xl font-bold text-center">Pesagens recentes</h1>
      </div>

      {isLoading ? (
        <h3 className="text-xl font-bold text-center">Carregando...</h3>
      ) : !weighings.length ? (
        <h3 className="text-xl font-bold text-center">Sem pesagens recentes.</h3>
      ): (
        <div className="flex flex-col gap-4">
          {weighings.map((weighing) => (
            <div className="rounded bg-zinc-900 p-4" key={weighing._id}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    {weighing.vehicle_model}{' - '}
                  <span className="opacity-70">
                    {weighing.vehicle_year}
                  </span>
                  </span>
                  <span>
                    Placa {weighing.license_plate_number}
                  </span>
                  <span>
                    Motorista: {weighing.driver_name}
                  </span>
                  <span className="opacity-80">
                    {weighing.company}
                  </span>
                  <span className="opacity-80">
                    Carga: {weighing.load_weight}kg
                  </span>
                </div>
                <div className="flex items-end flex-col gap-2">
                  <span className="opacity-80">
                    {moment(weighing.createdAt).format('DD MMMM YY')}
                  </span>
                  <span className={WeighingStatusLabel[weighing.status].color}>
                    {WeighingStatusLabel[weighing.status].label}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
