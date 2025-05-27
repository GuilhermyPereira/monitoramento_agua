@echo off
echo Iniciando o sistema de monitoramento de água...
echo.

:: Ativar ambiente virtual Python (ajuste se necessário)
cd backend
call venv\Scripts\activate

:: Iniciar o backend Flask
start "Backend" cmd /k python app.py

:: Voltar e iniciar o frontend
cd ../frontend

:: Instalar dependências se ainda não estiverem
IF NOT EXIST "node_modules" (
    echo Instalando dependências do frontend...
    npm install
)

:: Iniciar frontend com Vite
start "Frontend" cmd /k npm run dev

echo.
echo Servidores iniciados:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:5173
