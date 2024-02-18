#!/bin/bash

# Script para configurar y ejecutar la aplicación

# Función para instalar las dependencias de Node.js
install_dependencies() {
  echo "Instalando dependencias de Node.js..."
  npm install
}

# Función para configurar la base de datos MySQL
configure_database() {
  echo "Configurando la base de datos MySQL..."
  mysql -u abstract-programmer -p < database.sql
}

# Función para iniciar el servidor Node.js
start_server() {
  echo "Iniciando el servidor Node.js..."
  node EnsolversBackend/backend/index.js &
}

# Función para iniciar la aplicación React
start_react_app() {
  echo "Iniciando la aplicación React..."
  npm start --prefix EnsolversBackend/frontend
}

# Función principal que ejecuta todas las funciones anteriores
main() {
  install_dependencies
  configure_database
  start_server
  start_react_app
}

# Llamada a la función principal
main