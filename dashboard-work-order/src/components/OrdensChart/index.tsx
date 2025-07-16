import * as React from 'react';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, LabelList } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CHART_COLORS, CHART_DIMENSIONS } from './chartConfig';

const CustomBarLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#222"
      fontSize={18}
      fontWeight="bold"
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

interface OrdensChartProps {
  data: any;
}

const chartList = [
  {
    key: 'volumePorStatus',
    title: 'Ordens por Status',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.volumePorStatus} margin={CHART_DIMENSIONS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.volumePorStatus.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    key: 'volumePorTipo',
    title: 'Ordens por Tipo',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.volumePorTipo} margin={CHART_DIMENSIONS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.volumePorTipo.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    key: 'top10OrdensPorEquipamento',
    title: 'Top 5 Equipamento por OS',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.top10OrdensPorEquipamento} margin={CHART_DIMENSIONS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.top10OrdensPorEquipamento.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    key: 'ordensPorDepartamento',
    title: 'Ordens por Departamento',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.ordensPorDepartamento} margin={CHART_DIMENSIONS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.ordensPorDepartamento.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  // {
  //   key: 'ordensPorTecnico', 
  //   title: 'Ordens por Técnico',
  //   render: (data: any, COLORS: any) => (
  //     <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
  //       <BarChart data={data.ordensPorTecnico} margin={CHART_DIMENSIONS.margin}>
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis />
  //         <Tooltip />
  //         <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
  //           {data.ordensPorTecnico.map((entry: any, index: number) => (
  //             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //           ))}
  //         </Bar>
  //       </BarChart>
  //     </ResponsiveContainer>
  //   ),
  // },
  {
    key: 'ordensPorSupervisor',
    title: 'Ordens por Supervisor',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.ordensPorSupervisor} margin={CHART_DIMENSIONS.margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.ordensPorSupervisor.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  // {
  //   key: 'tendenciaOrdens',
  //   title: 'Tendência Mensal de Ordens',
  //   render: (data: any, COLORS: any) => (
  //     <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
  //       <LineChart
  //         data={data.tendenciaMensalOrdens}
  //         margin={CHART_DIMENSIONS.margin}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]} />
  //         <Tooltip />
  //         <Line
  //           type="monotone"
  //           dataKey="value"
  //           stroke="#8884d8"
  //           strokeWidth={3}
  //           dot={{ r: 6 }}
  //           activeDot={{ r: 8 }}
  //         >
  //           <LabelList dataKey="value" content={<CustomBarLabel />} />
  //         </Line>
  //       </LineChart>
  //     </ResponsiveContainer>
  //   ),
  // },
  // {
  //   key: 'top10Tecnicos',
  //   title: 'Top 10 técnicos que mais concluiram OS',
  //   render: (data: any, COLORS: any) => (
  //     <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
  //       <BarChart data={data.top10Tecnicos} margin={CHART_DIMENSIONS.margin} >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis />
  //         <Tooltip />
  //         <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
  //           {data.top10Tecnicos.map((entry: any, index: number) => (
  //             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //           ))}
  //         </Bar>
  //       </BarChart>
  //     </ResponsiveContainer>
  //   ),
  // },
  {
    key: 'topMecanicos',
    title: 'Top 5 mecânicos que mais concluiram OS',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.topMecanicos} margin={CHART_DIMENSIONS.margin} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.topMecanicos.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    key: 'topEletricistas',
    title: 'Top 5 eletricistas que mais concluiram OS',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.topEletricistas} margin={CHART_DIMENSIONS.margin} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis type='number' domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}/>
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.topEletricistas.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  {
    key: 'supervisorOrdensAbertas',
    title: 'Ordens Abertas por Supervisor',
    render: (data: any, COLORS: any) => (
      <ResponsiveContainer width="100%" height={CHART_DIMENSIONS.height}>
        <BarChart data={data.supervisorOrdensAbertas} margin={CHART_DIMENSIONS.margin} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis type='number' domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1)]}/>
          <Tooltip />
          <Bar dataKey="value" name="Quantidade" fill="#8884d8" label={<CustomBarLabel />}>
            {data.supervisorOrdensAbertas.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

const OrdensChart = ({ data }: OrdensChartProps) => {
  const safeData = {
    volumePorStatus: data.volumePorStatus || [],
    volumePorTipo: data.volumePorTipo || [],
    ordensPorEquipamento: data.ordensPorEquipamento || [],
    ordensPorDepartamento: data.ordensPorDepartamento || [],
    ordensPorTecnico: data.ordensPorTecnico || [],
    ordensPorSupervisor: data.ordensPorSupervisor || [],
    ordensPorOrganizacao: data.ordensPorOrganizacao || [],
    percentualPorStatus: data.percentualPorStatus || [],
    equipamentoMaisHoras: data.equipamentoMaisHoras || [],
    osPorEquipamento: data.osPorEquipamento || [],
    topSupervisores: data.topSupervisores || [],
    horasPorFuncionario: data.horasPorFuncionario || [],
    topSupervisoresConcluirOS: data.topSupervisoresConcluirOS || [],
    top10OrdensPorEquipamento: data.top10PorEquipamento || [],
    // top10Tecnicos: data.top10PorTecnicos || [],
    topEletricistas: data.topEletricistas || [],
    topMecanicos: data.topMecanicos || [],
    supervisorOrdensAbertas: data.supervisorOrdensAbertas || [],
    // tendenciaMensalOrdens: data.tendenciaMensalOrdens || [],
  };
  const [current, setCurrent] = React.useState(0);
  const COLORS = CHART_COLORS;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % chartList.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const chart = chartList[current];

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={chart.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7x1"
        >
          <div className="w-full bg-white rounded-xl shadow p-6 flex flex-col items-center" style={{ margin: '10px 0' }}>
            <h2 className="text-3xl font-semibold mb-4 text-center">{chart.title}</h2>
            <div style={{ width: '100%', height: '100%' }}>
              {chart.render(safeData, COLORS)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OrdensChart;
