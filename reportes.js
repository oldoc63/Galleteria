document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/obtener-pedidos')
        .then(response => response.json())
        .then(pedidos => {
            if (pedidos.length === 0) {
                document.getElementById('reportes-container').innerHTML = '<p>No hay datos de pedidos para mostrar.</p>';
                return;
            }

            // Calcular el ranking de galletas más vendidas
            const contadorGalletas = {};
            pedidos.forEach(pedido => {
                const galletas = pedido.detallesGalletas;
                galletas.forEach(galleta => {
                    contadorGalletas[galleta.tipo] = (contadorGalletas[galleta.tipo] || 0) + galleta.cantidad;
                });
            });

            const rankingGalletas = Object.entries(contadorGalletas)
                .sort(([, a], [, b]) => b - a);

            const rankingGalletasList = document.getElementById('ranking-galletas');
            rankingGalletas.forEach(([nombre, cantidad]) => {
                const li = document.createElement('li');
                li.textContent = `${nombre}: ${cantidad} vendidas`;
                rankingGalletasList.appendChild(li);
            });

            // Calcular el cliente que ha gastado más dinero
            const gastosClientes = {};
            pedidos.forEach(pedido => {
                gastosClientes[pedido.nombreCliente] = (gastosClientes[pedido.nombreCliente] || 0) + pedido.totalDolares;
            });

            const clienteMayorGasto = Object.entries(gastosClientes)
                .sort(([, a], [, b]) => b - a)[0];

            const clienteMayorGastoP = document.getElementById('cliente-mayor-gasto');
            clienteMayorGastoP.textContent = `El cliente que más ha gastado es ${clienteMayorGasto[0]} con un total de $${clienteMayorGasto[1].toFixed(2)}.`;
        })
        .catch(error => {
            console.error('Error al obtener los datos de pedidos:', error);
            document.getElementById('reportes-container').innerHTML = '<p>Error al cargar los reportes. Inténtalo de nuevo más tarde.</p>';
        });
});