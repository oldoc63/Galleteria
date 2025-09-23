# 🍪 Las Migas de Patty - Galleteria

*A cookie order management system for small bakeries*  
*Sistema de gestión de pedidos de galletas para pequeñas panaderías*

## English

### Overview

Galleteria is a full-stack web application designed for "Las Migas de Patty" bakery to manage cookie orders efficiently. The application handles multi-currency transactions (USD/Venezuelan Bolívar), partial payments, and provides sales analytics.

### Features

- **Order Management**: Create detailed cookie orders with dynamic pricing
- **Multi-Currency Support**: USD base prices with Venezuelan Bolívar conversion
- **Payment Tracking**: Support for partial payments (deposits) and pending amounts
- **Sales Analytics**: Cookie popularity rankings and customer spending reports
- **Data Persistence**: All orders stored locally with JSON database
- **Responsive Design**: Works on desktop and mobile devices

### Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: LowDB (JSON file-based)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Containerization**: Docker with Alpine Linux

### Quick Start with Docker

#### Prerequisites
- Docker installed on your system
- Port 3000 available (or use alternative port mapping)

#### Option 1: Docker Run (Simple)
```bash
# Build the image
docker build -t galleteria .

# Run the container
docker run -d -p 3000:3000 --name galleteria-app galleteria

# Run with data persistence
docker run -d -p 3000:3000 --name galleteria-app -v galleteria-data:/app/data galleteria
```

#### Option 2: Docker Compose (Recommended)
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

#### Access the Application
- Open your browser and navigate to `http://localhost:3000`
- For alternative port: `docker run -d -p 3001:3000 --name galleteria-app galleteria` → `http://localhost:3001`

### Local Development

#### Prerequisites
- Node.js 18+ installed
- npm package manager

#### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Access at http://localhost:3000
```

### Application Usage

1. **Create Orders**: Fill in customer details and add cookie types with quantities and prices
2. **Currency Conversion**: Enter current USD to Bolívar exchange rate
3. **Payment Processing**: Record customer deposits and track pending amounts
4. **View Reports**: Access sales analytics through the "Ver Reportes de Ventas" link

### Container Management

```bash
# View running containers
docker ps

# Stop container
docker stop galleteria-app

# Start container
docker start galleteria-app

# View container logs
docker logs galleteria-app

# Remove container
docker rm galleteria-app
```

---

## Español

### Descripción

Galleteria es una aplicación web completa diseñada para la panadería "Las Migas de Patty" para gestionar pedidos de galletas de manera eficiente. La aplicación maneja transacciones multi-moneda (USD/Bolívares Venezolanos), pagos parciales y proporciona análisis de ventas.

### Características

- **Gestión de Pedidos**: Crear pedidos detallados de galletas con precios dinámicos
- **Soporte Multi-Moneda**: Precios base en USD con conversión a Bolívares Venezolanos
- **Seguimiento de Pagos**: Soporte para pagos parciales (abonos) y montos pendientes
- **Análisis de Ventas**: Rankings de popularidad de galletas y reportes de gastos de clientes
- **Persistencia de Datos**: Todos los pedidos almacenados localmente con base de datos JSON
- **Diseño Responsivo**: Funciona en dispositivos de escritorio y móviles

### Stack Tecnológico

- **Backend**: Node.js con Express.js
- **Base de Datos**: LowDB (basada en archivos JSON)
- **Frontend**: JavaScript Vanilla, HTML5, CSS3
- **Contenedorización**: Docker con Alpine Linux

### Inicio Rápido con Docker

#### Prerequisitos
- Docker instalado en tu sistema
- Puerto 3000 disponible (o usar mapeo de puerto alternativo)

#### Opción 1: Docker Run (Simple)
```bash
# Construir la imagen
docker build -t galleteria .

# Ejecutar el contenedor
docker run -d -p 3000:3000 --name galleteria-app galleteria

# Ejecutar con persistencia de datos
docker run -d -p 3000:3000 --name galleteria-app -v galleteria-data:/app/data galleteria
```

#### Opción 2: Docker Compose (Recomendado)
```bash
# Iniciar la aplicación
docker-compose up -d

# Detener la aplicación
docker-compose down

# Ver logs
docker-compose logs -f
```

#### Acceder a la Aplicación
- Abre tu navegador y navega a `http://localhost:3000`
- Para puerto alternativo: `docker run -d -p 3001:3000 --name galleteria-app galleteria` → `http://localhost:3001`

### Desarrollo Local

#### Prerequisitos
- Node.js 18+ instalado
- Gestor de paquetes npm

#### Configuración
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Acceder en http://localhost:3000
```

### Uso de la Aplicación

1. **Crear Pedidos**: Completar detalles del cliente y agregar tipos de galletas con cantidades y precios
2. **Conversión de Moneda**: Ingresar la tasa de cambio actual de USD a Bolívares
3. **Procesamiento de Pagos**: Registrar abonos del cliente y rastrear montos pendientes
4. **Ver Reportes**: Acceder a análisis de ventas a través del enlace "Ver Reportes de Ventas"

### Gestión de Contenedores

```bash
# Ver contenedores en ejecución
docker ps

# Detener contenedor
docker stop galleteria-app

# Iniciar contenedor
docker start galleteria-app

# Ver logs del contenedor
docker logs galleteria-app

# Eliminar contenedor
docker rm galleteria-app
```

## File Structure / Estructura de Archivos

```
├── server.js          # Express backend / Backend de Express
├── package.json       # Node.js configuration / Configuración de Node.js
├── db.json           # LowDB data storage / Almacenamiento de datos LowDB
├── index.html        # Main order form / Formulario principal de pedidos
├── script.js         # Order form logic / Lógica del formulario de pedidos
├── reportes.html     # Sales reports page / Página de reportes de ventas
├── reportes.js       # Reports logic / Lógica de reportes
├── style.css         # Shared styling / Estilos compartidos
├── Dockerfile        # Docker container config / Configuración del contenedor Docker
├── docker-compose.yml # Docker Compose deployment / Despliegue con Docker Compose
├── .dockerignore     # Docker build exclusions / Exclusiones de construcción Docker
├── WARP.md           # Development documentation / Documentación de desarrollo
└── README.md         # This file / Este archivo
```

## Data Persistence / Persistencia de Datos

The application uses Docker volumes to persist order data between container restarts. Your order history will be maintained even when updating the application.

La aplicación utiliza volúmenes de Docker para persistir datos de pedidos entre reinicios de contenedores. Tu historial de pedidos se mantendrá incluso al actualizar la aplicación.

## Support / Soporte

For issues or questions, please check the WARP.md file for development guidance.

Para problemas o preguntas, por favor revisa el archivo WARP.md para orientación de desarrollo.

## License / Licencia

ISC License