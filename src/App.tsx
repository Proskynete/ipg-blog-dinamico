import { Suspense, useEffect } from "react";
import { AuthProvider } from "./providers/auth.provider";
import { setupFirebase } from "./libs/firebase.lib";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSignIn } from "./hooks/useSignIn";
import { useSignOut } from "./hooks/useSignOut";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { Loading } from "./components/loading.component";

const App = () => {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  useEffect(() => {
    setupFirebase();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) signIn(user);
      else signOut();
    });
  }, [signIn, signOut]);

  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
};

export { App };
