import * as React from 'react';
import OrdensCards from './components/OrdensCards';
import OrdensChart from './components/OrdensChart';
import { useOrdensData } from './hooks/useOrdensData';
import { motion } from 'framer-motion';
import logoEctx from './assets/logo-ectx.svg';

function App() {
  const { kpis, chartsData } = useOrdensData();

  React.useEffect(() => {
  const reloadTimeout = setTimeout(() => {
    window.location.reload();
  }, 3 * 60 * 60 * 1000); // 3 horas

  return () => clearTimeout(reloadTimeout);
}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start overflow-hidden">
      <motion.header className="w-full flex items-center justify-center bg-white shadow p-1 mb-4" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-row items-center w-full justify-center">
          <div className="flex items-center justify-center rounded mr-5" style={{ width: 300, height: 80 }}>
            <img src={logoEctx} alt="Logo ECTX" className="w-90 h-90 object-contain" />
          </div>
          {/* <div className="flex items-center justify-center rounded mr-5" style={{ width: 300, height: 128 }}>
            <img src={logoEam} alt="Logo EAM" className="w-128 h-128 object-contain" />
          </div> */}
          <h1 className="text-4xl font-bold text-gray-800 text-left">Acompanhamento ordens de serviço</h1>
        </div>
      </motion.header>
      <main className="w-full max-w-8xl px-1 flex flex-col items-center">
        <OrdensCards kpis={kpis} />
        <OrdensChart data={chartsData} />
      </main>
      <footer className="w-full flex justify-center items-center mt-4 mb-2">
        <span className="text-black-400 text-sm font-medium text-center">
          Desenvolvido por Luigi Fedele –{' '}
          <a href="https://github.com/LuigiFedele" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
