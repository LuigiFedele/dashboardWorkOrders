import * as React from 'react';
import { motion } from 'framer-motion';

export interface CardKPIProps {
  label: string;
  value: string | number;
  delay?: number;
}

export const CardKPI = ({ label, value, delay = 0 }: CardKPIProps) => (
  <motion.div
    className="bg-white rounded-lg shadow p-4 flex flex-col justify-between flex-1 h-32 min-w-0"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <span className="text-gray-500 text-sm font-medium text-left w-full">{label}</span>
    <span className="text-4xl font-bold text-gray-900 text-right w-full">{value}</span>
  </motion.div>
);

interface OrdensCardsProps {
  kpis: {
    total: number;
    abertas: number;
    andamento: number;
    aguardando: number;
    fechadas: number;
    // tempoMedio: number;
    // tecnicoMaisConcluidas: string;
    // ordensUltimaSemana: number;
    // diasUltimaParada: number;
    osCorretivasMes: number;
    osPreventivaMes: number;
    osMelhoriaMes: number;
    osEstrategicaMes: number;
    osPreditivaMes: number;
  };
}

const OrdensCards = ({ kpis }: OrdensCardsProps) => {
  const cards = [
    { label: 'Total de OS', value: kpis.total },
    { label: 'Abertas', value: kpis.abertas },
    { label: 'Aguardando', value: kpis.aguardando },
    { label: 'Em Andamento', value: kpis.andamento },
    { label: 'Concluídas', value: kpis.fechadas },
    { label: 'OS de Corretivas', value: kpis.osCorretivasMes },
    { label: 'OS de Preventivas', value: kpis.osPreventivaMes },
    { label: 'OS de Preditivas', value: kpis.osPreditivaMes },
    { label: 'OS de Melhorias', value: kpis.osMelhoriaMes },
    { label: 'OS de Estratégicas', value: kpis.osEstrategicaMes },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 w-full" style={{ gap: 10, margin: '10px 0' }}>
      {cards.map((card, idx) => (
        <CardKPI key={card.label} label={card.label} value={card.value} delay={0.1 * idx} />
      ))}
    </div>
  );
};

export default OrdensCards;
