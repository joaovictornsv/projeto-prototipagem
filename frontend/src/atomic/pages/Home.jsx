import { Button } from '../atoms/Button.jsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../router/RoutePaths.js';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-12">
      <h1 className="text-3xl font-bold">Sistema de pesagem</h1>
      <div className="flex items-center gap-4">
        <Button
          icon={faPlus}
          text="Nova pesagem"
          onClick={() => navigate(RoutePaths.NEW)}
        />
        <Button
          icon={faList}
          text="Pesagens recentes"
          type="secondary"
          onClick={() => navigate(RoutePaths.RECENT)}
        />
      </div>
    </div>
  );
};
