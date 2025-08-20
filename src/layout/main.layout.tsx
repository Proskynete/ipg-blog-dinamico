import { Outlet } from "react-router";

import { FooterLayout } from "./components/footer";
import { HeaderLayout } from "./components/header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderLayout />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <FooterLayout />
    </div>
  );
};

export default MainLayout;
