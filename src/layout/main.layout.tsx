import { Outlet } from "react-router";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { SignInButton } from "../modules/auth/infrastructure/ui/components/login-button";
import { SignOutButton } from "../modules/auth/infrastructure/ui/components/logout-button";
import { NavLink } from "react-router";

const MainLayout = () => {
  const { state } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <img
                className="w-[230px]"
                src="https://www.ipg.cl/wp-content/uploads/2023/12/logo-ipg.png"
              />
            </div>

            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-5">
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
              </nav>
              {state.state === "SIGNED_OUT" ? (
                <SignInButton />
              ) : (
                <SignOutButton />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
