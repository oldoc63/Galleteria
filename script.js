document.addEventListener('DOMContentLoaded', () => {

    const addCookieRowBtn = document.getElementById('add-cookie-row');
    const calculateTotalBtn = document.getElementById('calculate-total');
    const cookieRowsContainer = document.getElementById('cookie-rows');

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

    // --- Función para calcular los totales ---
    calculateTotalBtn.addEventListener('click', () => {
        let totalAmount = 0;
        const cookieRows = cookieRowsContainer.querySelectorAll('tr');

        // 1. Calcular el subtotal de cada fila y el total general
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

        // 3. Calcular el monto pendiente
        const pendingAmount = totalAmount - abonoAmount;

        // 4. Mostrar los resultados en la interfaz
        const totalAmountDisplay = document.getElementById('total-amount');
        const pendingAmountDisplay = document.getElementById('pending-amount');

        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
        pendingAmountDisplay.textContent = `$${pendingAmount.toFixed(2)}`;
    });

});