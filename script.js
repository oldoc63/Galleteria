document.addEventListener('DOMContentLoaded', () => {

    const addCookieRowBtn = document.getElementById('add-cookie-row');
    const calculateTotalBtn = document.getElementById('calculate-total');
    const cookieRowsContainer = document.getElementById('cookie-rows');

    // --- Inicializar la fecha del pedido con el día actual ---
    document.getElementById('order-date').valueAsDate = new Date();

    // --- Función para agregar una nueva fila para un tipo de galleta ---
    addCookieRowBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="cookie-type" placeholder="Ej: Avena y Pasas"></td>
            <td><input type="number" class="cookie-quantity" min="1" value="1"></td>
            <td><input type="number" class="cookie-cost" min="0" step="0.01" placeholder="0.00"></td>
            <td class="subtotal">$0.00</td>
        `;
        cookieRowsContainer.appendChild(newRow);
    });

    // --- Función para convertir USD a VES ---
    const convertUSDtoVES = (usdAmount, rate) => {
        if (!rate || rate <= 0) {
            return 0;
        }
        return usdAmount * rate;
    };

    // --- Función para calcular los totales ---
    calculateTotalBtn.addEventListener('click', () => {
        let totalAmount = 0;
        const cookieRows = cookieRowsContainer.querySelectorAll('tr');
        
        // Captura la fecha del pedido
        const orderDate = document.getElementById('order-date').value;
        console.log(`Calculando para el pedido con fecha: ${orderDate || 'No especificada'}`);

        // 1. Calcular el subtotal de cada fila y el total general en USD
        cookieRows.forEach(row => {
            const quantityInput = row.querySelector('.cookie-quantity');
            const costInput = row.querySelector('.cookie-cost');
            const subtotalCell = row.querySelector('.subtotal');

            const quantity = parseInt(quantityInput.value) || 0;
            const cost = parseFloat(costInput.value) || 0;

            const subtotal = quantity * cost;
            totalAmount += subtotal;

            subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
        });

        // 2. Obtener el monto del abono
        const abonoInput = document.getElementById('abono');
        const abonoAmount = parseFloat(abonoInput.value) || 0;

        // 3. Calcular el monto pendiente en USD
        const pendingAmount = totalAmount - abonoAmount;

        // 4. Obtener la tasa de cambio y calcular el total en Bolívares
        const exchangeRateInput = document.getElementById('exchange-rate');
        const exchangeRate = parseFloat(exchangeRateInput.value) || 0;
        const totalAmountVES = convertUSDtoVES(totalAmount, exchangeRate);

        // 5. Mostrar todos los resultados en la interfaz
        const totalAmountDisplay = document.getElementById('total-amount');
        const pendingAmountDisplay = document.getElementById('pending-amount');
        const totalAmountVesDisplay = document.getElementById('total-amount-ves');

        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
        pendingAmountDisplay.textContent = `$${pendingAmount.toFixed(2)}`;
        totalAmountVesDisplay.textContent = `Bs. ${totalAmountVES.toFixed(2)}`;
    });

});