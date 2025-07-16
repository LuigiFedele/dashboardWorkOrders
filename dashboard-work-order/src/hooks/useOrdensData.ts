import * as React from 'react';
// import { fetchOrdensComCacheLocalStorage } from '../api';
import {
  parseStatusDataComMapa,
  parseTypeDataComMapa,
  parseOrdensPorEquipamento,
  parseOrdensPorDepartamento,
  parseOrdensPorTecnico,
  parseOrdensPorSupervisor,
  parseOrdensPorOrganizacao,
  parseTop10OrdensPorEquipamento,
  parseTop10TecnicosQueMaisConcluiramOS,
  parseTopMecanicosQueMaisConcluiramOS,
  parseTopEletricistasQueMaisConcluiramOS,
  parseTendenciaMensalOrdens,
  parseOrdensAbertasPorSupervisor,
} from '../api/parsing';
import { STATUS_MAP, TYPE_MAP } from '../api/types';
import { fetchOrdens } from '../api';

export function useOrdensData() {
  const [kpis, setKpis] = React.useState({
    total: 0,
    abertas: 0,
    andamento: 0,
    aguardando: 0,
    fechadas: 0,
    // tempoMedio: 0,
    // tecnicoMaisConcluidas: '',
    // ordensUltimaSemana: 0,
    // diasUltimaParada: 0,
    osCorretivasMes: 0,
    osPreventivaMes: 0,
    osMelhoriaMes: 0,
    osEstrategicaMes: 0,
    osPreditivaMes: 0,
  });
  const [chartsData, setChartsData] = React.useState<any>({});

  React.useEffect(() => {
    async function getOrdens() {
      try {
        // const records = await fetchOrdensComCacheLocalStorage();
        const records = await fetchOrdens();
        console.log('API records:', records); // Debug: veja o que chega da API
        if (Array.isArray(records)) {
          const parsed = {
            volumePorStatus: parseStatusDataComMapa(records, STATUS_MAP),
            volumePorTipo: parseTypeDataComMapa(records, TYPE_MAP),
            ordensPorEquipamento: parseOrdensPorEquipamento(records),
            ordensPorDepartamento: parseOrdensPorDepartamento(records),
            ordensPorTecnico: parseOrdensPorTecnico(records),
            ordensPorSupervisor: parseOrdensPorSupervisor(records),
            ordensPorOrganizacao: parseOrdensPorOrganizacao(records),
            top10PorEquipamento: parseTop10OrdensPorEquipamento(records),
            top10PorTecnicos: parseTop10TecnicosQueMaisConcluiramOS(records),
            topMecanicos: parseTopMecanicosQueMaisConcluiramOS(records),
            topEletricistas: parseTopEletricistasQueMaisConcluiramOS(records),
            tendenciaMensalOrdens: parseTendenciaMensalOrdens(records),
            supervisorOrdensAbertas: parseOrdensAbertasPorSupervisor(records),
            // tendenciaVolume: ... (comentado)
            // tempoMedioAtendimento: ... (comentado)
            // ordensPorProblema: ... (comentado)
          };
          setKpis({
            total: records.length,
            abertas: parsed.volumePorStatus.find((s: any) => s.name === 'Abertas')?.value || 0,
            andamento: parsed.volumePorStatus.find((s: any) => s.name === 'Em Andamento')?.value || 0,
            aguardando: parsed.volumePorStatus.find((s: any) => s.name === 'Aguardando')?.value || 0,
            fechadas: parsed.volumePorStatus.find((s: any) => s.name === 'Fechadas')?.value || 0,
            // tempoMedio: 0,
            // tecnicoMaisConcluidas: '',
            // ordensUltimaSemana: 0,
            // diasUltimaParada: 0,
            osCorretivasMes: parsed.volumePorTipo.find((t: any) => t.name === 'Corretiva')?.value || 0,
            osPreventivaMes: parsed.volumePorTipo.find((t: any) => t.name === 'Preventiva')?.value || 0,
            osMelhoriaMes: parsed.volumePorTipo.find((t: any) => t.name === 'Melhoria')?.value || 0,
            osEstrategicaMes: parsed.volumePorTipo.find((t: any) => t.name === 'Estratégica')?.value || 0,
            osPreditivaMes: parsed.volumePorTipo.find((t: any) => t.name === 'Preditiva')?.value || 0,
          });
          setChartsData(parsed);
        }
      } catch (error) {
        console.error('Erro ao buscar ordens:', error);
      }
    }
    getOrdens();
    const interval = setInterval(getOrdens, 30000);
    return () => clearInterval(interval);
  }, []);

  return { kpis, chartsData };
}
