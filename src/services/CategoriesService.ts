const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
        throw new Error('Error al obtener las categorías');
    }
    return await response.json();
}

export async function createCategory(data: { name: string }) {
    const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al crear la categoría');
    }

    return await response.json();
}

export async function updateCategory(id: number, data: { name: string }) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
    }

    return await response.json();
}

export async function deleteCategory(id: number) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
    }

    return await response.json();
}
