import { Suspense, useEffect } from "react";
import { routeType } from ".";
import AuthLayout from "@/layouts/AuthLayout";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { useRouter } from "@/customHooks/useRouter";
import { isLoggedIn } from "@/utils";
import { useLocation } from "react-router-dom";

const FinalRoute = ({ route }: { route: routeType }) => {
  const router = useRouter();
  const location = useLocation();
  useEffect(() => {
    if (!route.public && !isLoggedIn()) { 
      router.push("/login");
    }
    if (isLoggedIn() && route.path == "/login") {
      router.push("/home");
    }
  }, [location]);

  return route.layout === "blank" ? (
    route.authLayout ? (
      <AuthLayout>
        <Suspense fallback={<></>}>
          <route.component />
        </Suspense>
      </AuthLayout>
    ) : (
      <Suspense fallback={<></>}>
        <route.component />
      </Suspense>
    )
  ) : (
    <DefaultLayout>
      <Suspense fallback={<></>}>
        <route.component />
      </Suspense>
    </DefaultLayout>
  );
};

export default FinalRoute;
