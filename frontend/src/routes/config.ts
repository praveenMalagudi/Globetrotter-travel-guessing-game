import { lazy } from "react";
import { routeType } from ".";

export const DefaultRoute = "/login";

/**
 * By default all routes are protected and have 'default' layout.
 * If a route doesn't requires auth, provide public: true
 * If a route requires blank layout, provide layout: 'blank'
 */
export const pageRoutes: Array<routeType> = [
  // {
  //   path: "/",
  //   component: lazy(() => import("@/pages/Home")),
  //   public: true,
  //   layout: "blank",
  // },
];
