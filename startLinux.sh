#!/bin/bash

echo "--------------------------------"
echo "Inicializando ambiente local de produção (Linux)..."
echo "--------------------------------"

# Iniciar Backend (NestJS)
echo "Iniciando Backend..."
cd sync-work-order-service

if [ ! -d "dist" ]; then
  echo "Compilando backend..."
  npm run build
fi

gnome-terminal -- bash -c "node dist/main; exec bash"
cd ..

sleep 3

# Iniciar Frontend (React)
echo "Iniciando Frontend..."
cd dashboard-work-order

if [ ! -d "build" ]; then
  echo "Compilando frontend..."
  npm run build
fi

if ! command -v serve &> /dev/null
then
    echo "Instalando 'serve' globalmente..."
    npm install -g serve
fi

gnome-terminal -- bash -c "serve -s build -l 3000; exec bash"
cd ..

sleep 5

# Abrir navegador em tela cheia
echo "Abrindo navegador em modo fullscreen..."
xdg-open http://localhost:3000

exit 0
