import { lazy } from "react";
import { routeType } from ".";

export const DefaultRoute = "/login";

/**
 * By default all routes are protected and have 'default' layout.
 * If a route doesn't requires auth, provide public: true
 * If a route requires blank layout, provide layout: 'blank'
 */
export const pageRoutes: Array<routeType> = [
  {
    path: "/login",
    component: lazy(() => import("@/pages/auth/Login")),
    public: true,
    layout: "blank",
    authLayout: false,
  },
  {
    path: "/signup",
    component: lazy(() => import("@/pages/auth/Registration")),
    public: true,
    layout: "blank",
  },
  {
    path: "/home",
    component: lazy(() => import("@/pages/home/Home")),
    public: false,
    layout: "blank",
  },
];
