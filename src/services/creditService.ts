const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCredits() {
    const response = await fetch(`${API_BASE_URL}/credits`);
    if (!response.ok) {
      throw new Error('Error al obtener los créditos');
    }
    return await response.json();
}

export async function createCredit(data: {
    customerId: number;   // ID del cliente asociado al crédito
    totalAmount: number;  // Monto total del crédito
    amountRemaining: number; // Monto restante por pagar
    dueDate?: string;     // Fecha de vencimiento del crédito (opcional)
    status?: 'ACTIVE' | 'PAID' | 'CANCELLED'; // Estado del crédito (opcional)
}) {
    const response = await fetch(`${API_BASE_URL}/credits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al crear el crédito');
    }

    return await response.json();
}

export async function updateCredit(
    id: number,
    data: {
        customerId?: number;    // ID del cliente (si es necesario actualizar)
        totalAmount?: number;   // Monto total actualizado (opcional)
        amountRemaining?: number; // Monto restante actualizado (opcional)
        dueDate?: string;       // Nueva fecha de vencimiento (opcional)
        status?: 'ACTIVE' | 'PAID' | 'CANCELLED'; // Nuevo estado del crédito (opcional)
    }
) {
    const response = await fetch(`${API_BASE_URL}/credits/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el crédito');
    }

    return await response.json();
}

export async function deleteCredit(id?: number) {
    const response = await fetch(`${API_BASE_URL}/credits/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el crédito');
    }

    return await response.json();
}

export async function updateCreditRemaining(id: number, amountRemaining: number) {
    const response = await fetch(`${API_BASE_URL}/credits/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amountRemaining }),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el monto restante del crédito');
    }

    return await response.json();
}
