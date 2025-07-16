export interface StatusMap {
  aberto: string[];
  fechado: string[];
  andamento: string[];
  aguardando: string[];
}

export interface TypeMap {
  corretiva: { values?: string[]; prefixes?: string[] };
  preventiva: { values?: string[]; prefixes?: string[] };
  preditiva: { values?: string[]; prefixes?: string[] };
  estrategica: { values?: string[]; prefixes?: string[] };
  melhoria: { values?: string[]; prefixes?: string[] };
}

export interface ManagerMap {
  [schedgroupCode: string]: string;
}

export const STATUS_MAP: StatusMap = {
  aberto: ['SVEX', 'PROG'],
  fechado: ['C', 'CANC', 'REJ'],
  andamento: ['EXEC', 'EMAN','ANFA',],
  aguardando: ['A', 'AGAT', 'AGET', 'AGMO', 'AGPA', 'AGRF', 'AMAT', 'APRG', 'PAUS', 'PROJ', 'Q', 'R'], 
};

export const TYPE_MAP: TypeMap = {
  corretiva: { prefixes: ['COR-'] },
  preventiva: { prefixes: ['PRV-'] },
  estrategica: { prefixes: ['EST-'] },
  preditiva: { prefixes: ['PDT-'] },
  melhoria: { prefixes: ['PM-'] },
};

export const MANAGER_MAP: ManagerMap = {
  RM013: 'Adilson Minichello',
  RM011: 'Albert Assis',
  RM007: 'Carlos Felipini',
  RM029: 'Cledson Gasparoto',
  RM022: 'Gilson Silesio',
  RM012: 'Marcio Costa',
  RM023: 'Marco Cignoni',
  RM021: 'Rodrigo Cesar',
  RM008: 'Sergio Barbosa',
  RM050: 'William Catharino',
  // RM073: 'Luigi Fedele',
}
