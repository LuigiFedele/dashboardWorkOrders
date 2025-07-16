# 📦 Dashborad Ordens de serviço p/ EAM Hexagon

Sistema completo para sincronização de ordens de serviço via API externa e exibição de dashboards visuais em TV corporativa.O projeto é dividido em dois módulos:

### 🔧 Backend (API): Sincroniza e armazena dados com NestJS + Prisma + Sqlite.
Sistema desenvolvido com NestJS, Prisma ORM e SQLite, responsável por sincronizar dados paginados via cursor de uma API externa e armazenar localmente para exibição em dashboards.

### 📺 Frontend (Dashboard TV): Exibe dados com React + Recharts.
Aplicação React + TypeScript responsiva e visual, ideal para exibição contínua em TVs corporativas. Consome a API backend e apresenta KPIs, gráficos e rankings com atualização periódica.

## Vídeo do projeto:
- [Aprensetação do dashboard](https://www.linkedin.com/posts/luigiffedele_reactjs-nestjs-manutenaexaetoindustrial-activity-7351283335928627205-pv_h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEPL1zIBjUApHNafvHBueynFVfpsBXZwtiI)

## 📁 Estrutura do Projeto
### Frontend
```
📦src
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜parsing.ts
 ┃ ┗ 📜types.ts
 ┣ 📂assets
 ┃ ┣ 📜logo-eam.svg
 ┃ ┗ 📜logo-ectx.svg
 ┣ 📂components
 ┃ ┣ 📂OrdensCards
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂OrdensChart
 ┃ ┃ ┣ 📜chartConfig.ts
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useOrdensData.ts
 ┣ 📜App.tsx
 ┣ 📜custom.d.ts
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┗ 📜mockData.ts
```

### Backend
```
 📦src
 ┣ 📂prisma
 ┃ ┣ 📜prisma.service.spec.ts
 ┃ ┗ 📜prisma.service.ts
 ┣ 📂workorder
 ┃ ┣ 📜workorder.controller.spec.ts
 ┃ ┣ 📜workorder.controller.ts
 ┃ ┣ 📜workorder.module.ts
 ┃ ┣ 📜workorder.service.spec.ts
 ┃ ┗ 📜workorder.service.ts
 ┣ 📜app.controller.spec.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts
```



## 🚀 Funcionalidades Backend

- 🔁 Sincronização automática e manual de ordens de serviço
- 📅 Conversão de datas complexas (ex: campos TARGETDATE)
- 💾 Banco local SQLite para uso leve
- 📡 Rota POST para disparar sincronização sob demanda
- 📊 Integração direta com o dashboard frontend

## 🎯 Funcionalidades Frontend

- 🖥️ Layout em tela cheia com KPIs e gráficos
- 📊 Ranking de técnicos com mais ociosidade
- 🔄 Atualização automática uma vez por dia
- 🗄️ Utilização de LocalStorange para melhorar a performance
- 🎨 Animações suaves com Framer Motion

## 📦 Tecnologias Utilizadas

### Backend
- TypeScript
- NestJS
- Prisma ORM
- SQLite
- Axios
- Docker

### Frontend
- TypeScript
- React
- Recharts
- Axios
- Tailwind
- Frame Motion
- Docker

## 🔃 Rotas

- [POST] http://localhost:8080/workorder/sync
- [GET] http://localhost:8080/workorder/workorders

- [Dashboard] http://localhost:3000/


A API percorre todas as páginas via cursorposition e armazena localmente e faz um retorno com todos os dados para utilização no dashboard.

## 📄 Modelo de Dados

```
model WorkOrder {
  jobNum                  String   @id
  organaizationCode       String
  workOrderDescription    String
  statusCode              String
  equipamentCode          String
  equipamentDescription   String
  departmentCode          String
  classCode               String
  problemCode             String?
  schedgroupCode          String?
  assignedToPersonCode    String?
  assignedToPersonName    String?
  targetDate              DateTime?
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```


## ▶️ Como Executar

#### Execução com Docker:
```
docker-compose up --build
```

#### Execução no Linux:
```
chmod +x start-all.sh
./start-all.sh
```

#### Execução no Windows:
```
Dê duplo clique no arquivo para executar -> "startWindows.bat"
```


## 👨‍💻 Desenvolvido por Luigi Fedele
