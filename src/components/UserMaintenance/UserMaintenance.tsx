// components/UserMaintenance/UserMaintenance.tsx
import React, { useEffect, useState } from 'react';
import UniversalTable from '../universalTable/Table/Table'; // Asegúrate de que la ruta sea correcta
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService'; // Asegúrate de que la ruta sea correcta

interface User {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
}

const UserMaintenance: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Asegúrate de que esta función devuelva el campo 'role'
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user.id);
      setUsers(users.filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleEdit = async (user: User) => {
    try {
      console.log(`Editando usuario: ${user.name}`);
      const updatedUserData = { ...user, name: 'Nuevo Nombre' }; 
      await updateUser(user.id, updatedUserData);
      setUsers(users.map(u => (u.id === user.id ? { ...u, ...updatedUserData } : u)));
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Email', accessor: 'email' },
    { label: 'Rol', accessor: 'role.name' }, // Mostrar el nombre del rol
  ];

  return (
    <div className="ml-5 mr-5 mt-5 overflow-x-auto">
      <UniversalTable
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UserMaintenance;
