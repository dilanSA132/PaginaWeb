

import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getRoles, createRole, deleteRole, updateRole } from '@/services/roleService'; 

interface Role {
  id: number;
  name: string;
}

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newRole, setNewRole] = useState<Role>({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const roles = await getRoles();
        setRoles(roles);
      } catch (err: any) {
        setError('Error al cargar los roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const openModalForNewRole = () => {
    setIsEditing(false); 
    setNewRole({ id: 0, name: '' }); 
    setModalIsOpen(true);
  };

  const openModalForEditRole = (role: Role) => {
    setIsEditing(true); 
    setNewRole({ ...role }); 
    setModalIsOpen(true);
  };

  const handleSaveRole = async () => {
    if (isEditing) {
      try {
        const updatedRole = await updateRole(newRole.id, { name: newRole.name });
        setRoles((prevRoles) =>
          prevRoles.map((r) => (r.id === updatedRole.id ? updatedRole : r))
        );
        setModalIsOpen(false);
        setNewRole({ id: 0, name: '' }); 
      } catch (err: any) {
        setError('Error al actualizar el rol');
      }
    } else {
      try {
        const createdRole = await createRole({ name: newRole.name });
        setRoles((prevRoles) => [...prevRoles, createdRole]);
        setModalIsOpen(false);
        setNewRole({ id: 0, name: '' }); 
      } catch (err: any) {
        setError('Error al crear el rol');
      }
    }
  };

  const handleDelete = async (role: Role) => {
    try {
      await deleteRole(role.id);
      setRoles((prevRoles) => prevRoles.filter((r) => r.id !== role.id));
    } catch (err: any) {
      setError('Error al eliminar el rol');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Roles</h1>

      <button
        onClick={openModalForNewRole}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nuevo Rol
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={roles}
          onEdit={openModalForEditRole} 
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando roles...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Rol' : 'Crear Nuevo Rol'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre del rol"
          />
        </div>
        <button
          onClick={handleSaveRole}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Rol'}
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
        >
          Cancelar
        </button>
      </CustomModal>
    </div>
  );
};

export default Roles;
