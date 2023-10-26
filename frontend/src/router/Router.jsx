import { Home } from '../atomic/pages/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../atomic/pages/NotFound.jsx';
import { RoutePaths } from './RoutePaths.js';
import { Layout } from './Layout.jsx';
import {New} from "../atomic/pages/New.jsx";
import {Recent} from "../atomic/pages/Recent.jsx";

const ROUTES_COMPONENTS = {
  [RoutePaths.HOME]: (
    <Layout>
      <Home />
    </Layout>
  ),
  [RoutePaths.NEW]: (
    <Layout>
      <New />
    </Layout>
  ),
  [RoutePaths.RECENT]: (
    <Layout>
      <Recent />
    </Layout>
  ),
};

export const MainRoutes = () => (
  <Routes>
    {Object.entries(ROUTES_COMPONENTS).map(([path, element]) => (
      <Route key={path} path={path} element={element} />
    ))}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
