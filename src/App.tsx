import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import Tenants from '@/pages/Tenants';
import Maintenance from '@/pages/Maintenance';
import Leasing from '@/pages/Leasing';
import Utilities from '@/pages/Utilities';
import BodyCorporate from '@/pages/BodyCorporate';
import CASAFIMS from '@/pages/CASAFIMS';
import Volumetric from '@/pages/Volumetric';
import DigitalTwin from '@/pages/DigitalTwin';
import Revenue from '@/pages/Revenue';
import Compliance from '@/pages/Compliance';
import Settings from '@/pages/Settings';
import Portal from '@/pages/Portal';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/leasing" element={<Leasing />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/body-corporate" element={<BodyCorporate />} />
          <Route path="/casa-fims" element={<CASAFIMS />} />
          <Route path="/volumetric" element={<Volumetric />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/portals/:type" element={<Portal />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
