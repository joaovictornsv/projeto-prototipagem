import { Input } from '../atoms/Input.jsx';
import { Button } from '../atoms/Button.jsx';
import { useState } from 'react';
import {
  createWeighing,
  getLicensePlateInfo,
  verifyInvoiceNumber,
} from '../../utils/api.js';
import { RoutePaths } from '../../router/RoutePaths.js';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/websocket.js';

export const New = () => {
  const navigate = useNavigate();
  const [driverName, setDriverName] = useState('');
  const [driverDocument, setDriverDocument] = useState('');

  const [licensePlateNumber, setLicensePlateNumber] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState({});

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceInfo, setInvoiceInfo] = useState({});

  const [isCreating, setIsCreating] = useState(false);

  const validateInfo = () => {
    return (
      !driverName ||
      !driverDocument ||
      !licensePlateNumber ||
      !vehicleInfo.model ||
      !vehicleInfo.year ||
      !invoiceNumber ||
      !invoiceInfo.loadWeight ||
      !invoiceInfo.company
    );
  };

  const onVerifyLicensePlate = () => {
    getLicensePlateInfo()
      .then((data) => {
        setVehicleInfo(data);
      })
      .catch((e) => console.error(e));
  };

  const onVerifyInvoiceNumber = () => {
    verifyInvoiceNumber()
      .then((data) => {
        setInvoiceInfo(data);
      })
      .catch((e) => console.error(e));
  };

  const onSave = () => {
    const data = {
      driver: {
        name: driverName,
        document_number: driverDocument,
      },
      license_plate: {
        number: licensePlateNumber,
        vehicle_model: vehicleInfo.model,
        vehicle_year: vehicleInfo.year,
      },
      invoice: {
        barcode: invoiceNumber,
        company_name: invoiceInfo.company,
        load_weight: invoiceInfo.loadWeight,
        load_items: invoiceInfo.loadItems,
        amount: invoiceInfo.amount,
      },
    };
    setIsCreating(true);
    createWeighing(data)
      .then(() => {
        socket.emit('newWeighing');
        setIsCreating(false);
        navigate(RoutePaths.RECENT);
      })
      .catch((e) => console.log(e));
  };
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

        <h1 className="text-center text-3xl font-bold">Sistema de pesagem</h1>
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-center text-2xl font-medium">Motorista</h1>
        <div className="flex w-full items-center gap-4">
          <Input
            label="Nome"
            placeholder="José"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={driverDocument}
            onChange={(e) => setDriverDocument(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-center text-2xl font-medium">Veículo</h1>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-end gap-4">
            <Input
              label="Número da placa"
              placeholder="ABC1D34"
              value={licensePlateNumber}
              onChange={(e) => setLicensePlateNumber(e.target.value)}
            />
            <Button
              size="sm"
              type="secondary"
              text="Verificar"
              className="w-max"
              onClick={onVerifyLicensePlate}
            />
          </div>

          <div className="flex items-end gap-4">
            <Input label="Modelo" value={vehicleInfo.model} disabled />
            <Input label="Ano" disabled value={vehicleInfo.year} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4">
        <h1 className="text-center text-2xl font-medium">Nota fiscal</h1>
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-end gap-4">
            <Input
              label="Número da nota"
              placeholder="1010100101101"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <Button
              size="sm"
              text="Verificar"
              type="secondary"
              className="w-max"
              onClick={onVerifyInvoiceNumber}
            />
          </div>

          <Input label="Companhia" value={invoiceInfo.company} disabled />

          <div className="flex items-end gap-4">
            <Input label="Carga (kg)" value={invoiceInfo.loadWeight} disabled />
            <Input
              label="Total R$"
              value={`R$ ${((invoiceInfo.amount || 0) / 100).toFixed(2)}`}
              disabled
            />
          </div>
        </div>
      </div>

      <Button
        text={isCreating ? 'Salvando...' : 'Salvar'}
        disabled={validateInfo() || isCreating}
        onClick={onSave}
      />
    </div>
  );
};
