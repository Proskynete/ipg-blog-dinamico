import { Outlet } from "react-router";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { SignInButton } from "../modules/auth/infrastructure/ui/components/login-button";
import { SignOutButton } from "../modules/auth/infrastructure/ui/components/logout-button";
import { NavLink } from "react-router";

const MainLayout = () => {
  const { state } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <NavLink to="/">
              <img
                className="w-[230px]"
                src="https://www.ipg.cl/wp-content/uploads/2023/12/logo-ipg.png"
              />
            </NavLink>

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
                    to="/my-workspace/my-posts"
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

      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-light text-gray-900">
              Programación Frontend
            </h4>

            <div className="flex flex-col items-center">
              <div className="flex space-x-2 text-sm">
                <pre className="text-xs">
                  $ cd ~/
                  <a
                    href="https://eduardoalvarez.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    eduardoalvarez.dev
                  </a>
                  /{currentYear}
                  <span className="w-1 h-3 inline-block bg-gray-400 ml-1 rounded-sm motion-safe:animate-ping motion-safe:duration-75"></span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
