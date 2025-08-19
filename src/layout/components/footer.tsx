export const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
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
  );
};
