import { Outlet } from "react-router";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { SignInButton } from "../modules/auth/infrastructure/ui/components/login-button";
import { SignOutButton } from "../modules/auth/infrastructure/ui/components/logout-button";
import { NavLink } from "react-router";

const MainLayout = () => {
  const { state } = useAuth();

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-gray-900">
                Programación Front End
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Unidad 2: Desarrollo Avanzado de Interfaz de Usuario
              </p>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                Inicio
              </NavLink>
              {state.state === "SIGNED_IN" ? (
                <NavLink
                  to="/my-posts"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Mis Publicaciones
                </NavLink>
              ) : null}
              {state.state === "SIGNED_OUT" ? (
                <SignInButton />
              ) : (
                <SignOutButton />
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
