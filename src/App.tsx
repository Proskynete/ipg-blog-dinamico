import { Suspense } from "react";
import { AuthProvider } from "./modules/auth/infrastructure/ui/provider/auth.provider";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { Loading } from "./components/loading.component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { App };
