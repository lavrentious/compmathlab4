import React from "react";
import MainPage from "src/modules/approximation/pages/MainPage";
import NotFoundPage from "src/modules/common/pages/NotFoundPage";

export type Route = {
  path: string;
  element: React.ReactNode;
};

const routes: Route[] = [
  { element: <MainPage />, path: "/" },
  { element: <NotFoundPage />, path: "/*" },
];

export default routes;
