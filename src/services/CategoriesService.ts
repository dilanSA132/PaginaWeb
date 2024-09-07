
export async function getCategories() {
    const response = await fetch('http://localhost:3000/api/v1/categories');
    if (!response.ok) {
        throw new Error('Error al obtener las categorías');
    }
    return await response.json();
}

export async function createCategory(data: { name: string }) {
    const response = await fetch('http://localhost:3000/api/v1/categories', {
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
    const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
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
    const response = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la categoría');
    }

    return await response.json();
}
