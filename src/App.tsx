import { Suspense } from "react";
import { AuthProvider } from "./modules/auth/infrastructure/ui/provider/auth.provider";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { Loading } from "./components/loading.component";

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
};

export { App };
