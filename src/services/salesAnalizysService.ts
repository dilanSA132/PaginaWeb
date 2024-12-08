export const getSalesAnalizys = async () => {
  const response = await fetch('http://localhost:3000/api/v1/salesAnalizy', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error al obtener el análisis de ventas');
  }

  return response.json();
};
