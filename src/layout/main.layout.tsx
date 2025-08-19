import { Outlet } from "react-router";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { SignInButton } from "../modules/auth/infrastructure/ui/components/login-button";
import { SignOutButton } from "../modules/auth/infrastructure/ui/components/logout-button";
import { NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa6";

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
                <NavLink
                  to="/posts"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Artículos
                </NavLink>

                <div className="flex gap-2">
                  {state.state === "SIGNED_IN" ? (
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar avatar-placeholder"
                      >
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                          {state.currentUser.photoURL ? (
                            <img
                              src={state.currentUser.photoURL}
                              alt={
                                state.currentUser.displayName || "User Avatar"
                              }
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <FaRegUser className="text-4xl text-gray-400" />
                          )}
                        </div>
                      </div>

                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                      >
                        <li>
                          <NavLink
                            to="/my-workspace"
                            className="text-gray-900 hover:text-gray-600 transition-colors"
                          >
                            Mi perfil
                          </NavLink>
                        </li>
                        <div className="divider my-1" />
                        <li>
                          <SignOutButton />
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <SignInButton />
                  )}
                </div>
              </nav>
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
