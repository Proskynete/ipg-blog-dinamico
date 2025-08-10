const Loading = () => (
  <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
    <span className="loading loading-ring loading-xl" />
    <p className="text-gray-700 mt-4">Cargando...</p>
  </div>
);

export { Loading };
