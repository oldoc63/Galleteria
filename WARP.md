# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Galleteria ("Las Migas de Patty") is a cookie order management system for a small bakery business. It's a full-stack web application that handles cookie orders with USD/Venezuelan Bolívar currency conversion, payment tracking, and sales reporting.

## Development Commands

### Local Development

#### Install Dependencies
```powershell
npm install
```

#### Start Development Server
```powershell
npm start
```
Starts the Express.js server on http://localhost:3000

#### Manual Testing
Since no automated tests are configured, test manually by:
1. Starting the server with `npm start`
2. Opening `index.html` in a browser
3. Creating test orders and verifying data persistence
4. Checking sales reports at `reportes.html`

### Docker Deployment

#### Build Docker Image
```powershell
docker build -t galleteria .
```

#### Run Container (Simple)
```powershell
docker run -d -p 3000:3000 --name galleteria-app galleteria
```

#### Run Container with Data Persistence
```powershell
docker run -d -p 3000:3000 --name galleteria-app -v galleteria-data:/app/data galleteria
```

#### Using Docker Compose (Recommended)
```powershell
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build
```

#### Container Management Commands
```powershell
# View running containers
docker ps

# Stop container
docker stop galleteria-app

# Start container
docker start galleteria-app

# Remove container
docker rm galleteria-app

# View container logs
docker logs galleteria-app
```

## Architecture Overview

### Backend (server.js)
- **Framework**: Express.js with ES modules
- **Database**: LowDB with JSON file storage (db.json)
- **CORS**: Enabled for cross-origin requests
- **Port**: 3000

#### API Endpoints
- `POST /api/guardar-pedido` - Save new orders
- `GET /api/obtener-pedidos` - Retrieve all orders

### Frontend Architecture
The application uses vanilla JavaScript with a multi-page structure:

#### Main Application (index.html + script.js)
- **Order Form**: Dynamic cookie type/quantity entry with real-time subtotal calculation  
- **Currency Handling**: USD base prices with Venezuelan Bolívar conversion using exchange rates
- **Payment Tracking**: Support for partial payments (abonos) and pending amounts
- **Data Persistence**: Sends order data to backend API via fetch

#### Reports Page (reportes.html + reportes.js)
- **Analytics**: Cookie popularity ranking and customer spending analysis
- **Data Source**: Fetches from `/api/obtener-pedidos` endpoint

### Data Structure
Orders are stored with the following schema:
```javascript
{
  nombreCliente: string,
  fecha: string (YYYY-MM-DD),
  detallesGalletas: [
    {
      tipo: string,
      cantidad: number,
      costo: number (USD)
    }
  ],
  totalDolares: number,
  abono: number (USD),
  montoPendiente: number (USD),
  totalBolivares: number,
  id: number (timestamp),
  fechaGuardado: string (ISO date)
}
```

## Key Business Logic

### Currency Conversion
- Base currency is USD for cookie prices
- Venezuelan Bolívar conversion using user-provided exchange rate
- Formula: `totalBolivares = totalDolares * exchangeRate`

### Payment System
- Supports partial payments (abono)
- Tracks pending amounts: `montoPendiente = totalDolares - abono`
- Can handle overpayments (negative pending amounts)

### Dynamic Order Entry
- Users can add unlimited cookie types per order
- Real-time subtotal calculation: `subtotal = quantity * unitCost`
- Form validation ensures positive quantities and costs

## File Structure
```
├── server.js          # Express backend
├── package.json       # Node.js configuration
├── db.json           # LowDB data storage
├── index.html        # Main order form
├── script.js         # Order form logic
├── reportes.html     # Sales reports page  
├── reportes.js       # Reports logic
├── style.css         # Shared styling
├── Dockerfile        # Docker container configuration
├── docker-compose.yml # Docker Compose deployment
├── .dockerignore     # Docker build exclusions
└── WARP.md           # This documentation file
```

## Development Notes

### Database Considerations
- Data persists in `db.json` - backup before major changes
- No database migrations - structure changes require manual data updates
- Each order gets a unique timestamp-based ID

### Frontend-Backend Communication
- Backend must be running for frontend functionality
- Frontend makes direct HTTP requests to localhost:3000
- No authentication or authorization implemented

### Currency Exchange Rates
- Exchange rates are entered manually per order
- No automatic rate fetching - rates reflect user input at order time
- Historical rates preserved in order records

### Docker Deployment
- Container runs on Alpine Linux with Node.js 20 LTS
- Data persistence handled via Docker volumes mounted to `/app/data`
- Non-root user (galleteria) for enhanced security
- Health checks ensure application availability
- Container exposes port 3000 for web access
- Use Docker Compose for production deployments
