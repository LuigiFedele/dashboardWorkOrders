@echo off
title Inicialização do Sistema Local
echo --------------------------------
echo Inicializando ambiente local de produção...
echo --------------------------------

:: Iniciar backend NestJS (em produção)
echo Iniciando Backend...
cd sync-work-order-service
if not exist dist (
    echo Compilando backend...
    npm run build
)
start cmd /k "node dist/main"
cd ..

timeout /t 3

:: Iniciar frontend React (produção)
echo Iniciando Frontend...
cd dashboard-work-order

if not exist build (
    echo Compilando frontend...
    npm run build
)

:: Verifica se o serve está instalado globalmente
where serve >nul 2>nul
if errorlevel 1 (
    echo Instalando servidor local para frontend...
    npm install -g serve
)

start cmd /k "serve -s build -l 3000"
cd ..

timeout /t 5

:: Abrir navegador em tela cheia apontando para o frontend
echo Abrindo navegador em modo TV...
start chrome --kiosk http://localhost:3000

exit
