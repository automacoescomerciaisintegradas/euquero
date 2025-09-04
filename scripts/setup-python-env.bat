@echo off
echo Configurando ambiente Python para automacao do Instagram...

REM Verificar se Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Erro: Python nao esta instalado ou nao esta no PATH
    echo Baixe e instale Python em: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Criar ambiente virtual
echo Criando ambiente virtual...
python -m venv instagram-env

REM Ativar ambiente virtual
echo Ativando ambiente virtual...
call instagram-env\Scripts\activate.bat

REM Instalar dependencias
echo Instalando dependencias...
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo Configuracao concluida com sucesso!
echo.
echo Para usar o ambiente virtual:
echo 1. Execute: instagram-env\Scripts\activate.bat
echo 2. Execute o script: python instagram-automation.py
echo.
pause