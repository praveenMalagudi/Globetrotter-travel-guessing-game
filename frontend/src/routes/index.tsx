import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { DefaultRoute, pageRoutes } from "@/routes/config";
import NotFound from "@/pages/NotFound";
import FinalRoute from "./FinalRoute";
export type routeType = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout: "blank" | "default";
  public?: boolean;
  authLayout?: boolean;
};
function Router() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to={DefaultRoute} />} />
        {pageRoutes.map((route: routeType) => (
          <Route
            key={route.path}
            path={route.path}
            element={<FinalRoute route={route} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
