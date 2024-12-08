// components/RoleMaintenance/RoleMaintenance.tsx
import React, { useEffect, useState } from 'react';
import UniversalTable from '../universalTable/Table/Table'; // Asegúrate de que la ruta sea correcta
import { getRoles, createRole, updateRole, deleteRole } from '../../services/roleService'; // Asegúrate de que la ruta sea correcta

interface Role {
    id: number;
    name: string; // Asegúrate de usar el nombre de propiedad correcto
    permissions?: string[]; // Agrega esta propiedad si es necesaria
  }
  
const RoleMaintenance: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error('Error al cargar los roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (role: Role) => {
    try {
      await deleteRole(role.id);
      setRoles(roles.filter(r => r.id !== role.id));
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };

  const handleEdit = async (role: Role) => {
    try {
      // Aquí puedes agregar lógica para editar un rol, como abrir un modal y luego hacer la llamada a updateRole
      console.log(`Editando rol: ${role.name}`);
      const updatedRoleData = { ...role, name: 'Nuevo Nombre' }; // Ejemplo de edición
      await updateRole(role.id, updatedRoleData);
      setRoles(roles.map(r => (r.id === role.id ? { ...r, ...updatedRoleData } : r)));
    } catch (error) {
      console.error('Error al editar el rol:', error);
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
  ];

  return (
    <div className="ml-5 mr-5 mt-5 overflow-x-auto">
      <UniversalTable
        columns={columns}
        data={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RoleMaintenance;
