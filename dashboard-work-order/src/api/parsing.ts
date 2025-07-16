import { StatusMap, TypeMap, ManagerMap, STATUS_MAP, TYPE_MAP, MANAGER_MAP } from './types';

export function parseStatusDataComMapa(dataRecord: any[], statusMap: StatusMap = STATUS_MAP): { name: string; value: number }[] {
  let aberto = 0, fechado = 0, andamento = 0, aguardando = 0, outros = 0;
  dataRecord.forEach((item) => {
    const status = (item.statusCode || '').toUpperCase();
    if (statusMap.aberto.includes(status)) aberto++;
    else if (statusMap.fechado.includes(status)) fechado++;
    else if (statusMap.andamento.includes(status)) andamento++;
    else if (statusMap.aguardando && statusMap.aguardando.includes(status)) aguardando++;
    else outros++;
  });
  const result = [
    { name: 'Abertas', value: aberto },
    { name: 'Em Andamento', value: andamento },
    { name: 'Aguardando', value: aguardando },
    { name: 'Fechadas', value: fechado },
  ];
  if (outros > 0) result.push({ name: 'Outros', value: outros });
  return result;
}

export function parseTypeDataComMapa(dataRecord: any[], typeMap: TypeMap = TYPE_MAP): { name: string; value: number }[] {
  let corretiva = 0, preventiva = 0, preditiva = 0, melhoria = 0, estrategica = 0, outros = 0;
  dataRecord.forEach((item) => {
    const tipo = (item.classCode || '').toUpperCase();
    if (
      (typeMap.corretiva.values && typeMap.corretiva.values.includes(tipo)) ||
      (typeMap.corretiva.prefixes && typeMap.corretiva.prefixes.some((prefix) => tipo.startsWith(prefix.toUpperCase())))
    ) {
      corretiva++;
    } else if (
      (typeMap.preventiva.values && typeMap.preventiva.values.includes(tipo)) ||
      (typeMap.preventiva.prefixes && typeMap.preventiva.prefixes.some((prefix) => tipo.startsWith(prefix.toUpperCase())))
    ) {
      preventiva++;
    } else if (
      (typeMap.preditiva.values && typeMap.preditiva.values.includes(tipo)) ||
      (typeMap.preditiva.prefixes && typeMap.preditiva.prefixes.some((prefix) => tipo.startsWith(prefix.toUpperCase())))
    ) {
      preditiva++;
    } else if (
      (typeMap.melhoria.values && typeMap.melhoria.values.includes(tipo)) ||
      (typeMap.melhoria.prefixes && typeMap.melhoria.prefixes.some((prefix) => tipo.startsWith(prefix.toUpperCase())))
    ) {
      melhoria++;
    } else if (
      (typeMap.estrategica && (
        (typeMap.estrategica.values && typeMap.estrategica.values.includes(tipo)) ||
        (typeMap.estrategica.prefixes && typeMap.estrategica.prefixes.some((prefix) => tipo.startsWith(prefix.toUpperCase())))
      ))
    ) {
      estrategica++;
    } else {
      outros++;
    }
  });
  const result = [
    { name: 'Corretiva', value: corretiva },
    { name: 'Preventiva', value: preventiva },
    { name: 'Preditiva', value: preditiva },
    { name: 'Melhoria', value: melhoria },
    { name: 'Estratégica', value: estrategica },
  ];
  if (outros > 0) result.push({ name: 'Outros', value: outros });
  return result;
}

// Ordens por Equipamento
export function parseOrdensPorEquipamento(dataRecord: any[]): { name: string; value: number }[] {
  const eqpCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const eqp = item.equipamentDescription || item.equipamentCode || 'Indefinido';
    eqpCount[eqp] = (eqpCount[eqp] || 0) + 1;
  });
  return Object.entries(eqpCount).map(([name, value]) => ({ name, value }));
}

// Top 10 Ordens por Equipamento
export function parseTop10OrdensPorEquipamento(dataRecord: any[]): { name: string; value: number }[] {
  const eqpCount: Record<string, number> = {};

  dataRecord.forEach((item) => {
    const eqp = item.equipamentDescription || item.equipamentCode || 'Indefinido';
    eqpCount[eqp] = (eqpCount[eqp] || 0) + 1;
  });

  return Object.entries(eqpCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value) 
    .slice(0, 5);
}


// Ordens por Departamento
export function parseOrdensPorDepartamento(dataRecord: any[]): { name: string; value: number }[] {
  const depCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const dep = item.departmentCode || 'Indefinido';
    depCount[dep] = (depCount[dep] || 0) + 1;
  });
  return Object.entries(depCount).map(([name, value]) => ({ name, value }));
}

// Ordens por Técnico
export function parseOrdensPorTecnico(dataRecord: any[]): { name: string; value: number }[] {
  const techCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const tech = item.assignedToPersonName || item.assignedToPersonCode || 'Indefinido';
    techCount[tech] = (techCount[tech] || 0) + 1;
  });
  return Object.entries(techCount).map(([name, value]) => ({ name, value }));
}

// Top 5 Técnicos que mais concluíram Ordens de Serviço
export function parseTop10TecnicosQueMaisConcluiramOS(dataRecord: any[]): { name: string; value: number }[] {
  const tecnicoCount: Record<string, number> = {};

  dataRecord.forEach((item) => {
    if (item.statusCode === 'C') { 
      const tecnico = item.assignedToPersonName || item.assignedToPersonCode || 'Indefinido';
      tecnicoCount[tecnico] = (tecnicoCount[tecnico] || 0) + 1;
    }
  });

  return Object.entries(tecnicoCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

// Top 5 Mecânicos que mais concluíram Ordens de Serviço
export function parseTopMecanicosQueMaisConcluiramOS(dataRecord: any[]): { name: string; value: number }[] {
  const mecanicoCount: Record<string, number> = {};

  dataRecord.forEach((item) => {
    if (item.departmentCode === 'DMM') {
      if (item.statusCode === 'C') { 
        const mecanico = item.assignedToPersonName || item.assignedToPersonCode || 'Indefinido';
        mecanicoCount[mecanico] = (mecanicoCount[mecanico] || 0) + 1;
      }
    }
  });

  return Object.entries(mecanicoCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

// Top 5 Eletricistas que mais concluíram Ordens de Serviço
export function parseTopEletricistasQueMaisConcluiramOS(dataRecord: any[]): { name: string; value: number }[] {
  const eletricistaCount: Record<string, number> = {};

  dataRecord.forEach((item) => {
    if (item.departmentCode === 'DME') {
      if (item.statusCode === 'C') { 
        const eletricista = item.assignedToPersonName || item.assignedToPersonCode || 'Indefinido';
        eletricistaCount[eletricista] = (eletricistaCount[eletricista] || 0) + 1;
      }
    }
  });

  return Object.entries(eletricistaCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}


// Ordens por Supervisor
export function parseOrdensPorSupervisor(dataRecord: any[]): { name: string; value: number }[] {
  const supCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const code = item.schedgroupCode || 'Indefinido';
    const supervisorName = MANAGER_MAP[code] || 'Indefinido';
    supCount[supervisorName] = (supCount[supervisorName] || 0) + 1;
  });
  return Object.entries(supCount).map(([name, value]) => ({ name, value }));
}

// Supervisor Ordens abertas
export function parseOrdensAbertasPorSupervisor(dataRecord: any[]): { name: string; value: number }[] {
  const supCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const code = item.schedgroupCode || 'Indefinido';
    const supervisorName = MANAGER_MAP[code] || 'Indefinido';
    if (item.statusCode === 'SVEX') {
      supCount[supervisorName] = (supCount[supervisorName] || 0) + 1;
    }
  });
  return Object.entries(supCount).map(([name, value]) => ({ name, value }));
}


// Ordens por Organização
export function parseOrdensPorOrganizacao(dataRecord: any[]): { name: string; value: number }[] {
  const orgCount: Record<string, number> = {};
  dataRecord.forEach((item) => {
    const org = item.organizationCode || 'Indefinido';
    orgCount[org] = (orgCount[org] || 0) + 1;
  });
  return Object.entries(orgCount).map(([name, value]) => ({ name, value }));
}


// Tendencia Mensal de Ordens
export function parseTendenciaMensalOrdens(dataRecord: any[]): { name: string; value: number }[] {
  const countPorMes: Record<string, number> = {};

  dataRecord.forEach((item) => {
    const year = new Date(item.YearDate).getUTCFullYear();
    const month = item.MonthDate ?? 1;
    if (typeof month !== 'number' || isNaN(month) || month < 1 || month > 12) {
      console.warn(`Mês inválido encontrado: ${month} para o item`, item);
      return;
    }
    // Formata como "MM/YYYY"
    const key = `${String(month).padStart(2, '0')}/${year}`;

    countPorMes[key] = (countPorMes[key] || 0) + 1;
  });

  return Object.entries(countPorMes)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.name.split('/').map(Number);
      const [bMonth, bYear] = b.name.split('/').map(Number);
      return aYear !== bYear ? aYear - bYear : aMonth - bMonth;
    });
}