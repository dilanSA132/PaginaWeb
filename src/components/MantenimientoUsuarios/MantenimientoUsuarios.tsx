import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import { getUsers, createUser, deleteUser, updateUser } from '@/services/userService'; // Importa el servicio

interface User {
  id: number;
  name: string;
  email: string;
}

const MantenimientoUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newUser, setNewUser] = useState<User & { password?: string }>({ id: 0, name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await getUsers();
        setUsuarios(users);
      } catch (err: any) {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModalForNewUser = () => {
    setIsEditing(false); // Estamos creando un nuevo usuario
    setNewUser({ id: 0, name: '', email: '', password: '' }); // Limpia el formulario
    setModalIsOpen(true);
  };

  const openModalForEditUser = (usuario: User) => {
    setIsEditing(true); // Estamos editando un usuario existente
    setNewUser({ ...usuario }); // Carga la info del usuario en el formulario
    setModalIsOpen(true);
  };

  const handleSaveUser = async () => {
    if (isEditing) {
      // Si estamos en modo edición, actualizamos el usuario existente
      try {
        const updatedUser = await updateUser(newUser.id, { name: newUser.name, email: newUser.email }); // Llama al servicio
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setModalIsOpen(false);
        setNewUser({ id: 0, name: '', email: '', password: '' }); // Limpia los campos después de guardar
      } catch (err: any) {
        setError('Error al actualizar el usuario');
      }
    } else {
      // Si no estamos en modo edición, estamos creando un nuevo usuario
      try {
        const createdUser = await createUser({ ...newUser, roleId: 1 });
        setUsuarios((prevUsuarios) => [...prevUsuarios, createdUser]);
        setModalIsOpen(false);
        setNewUser({ id: 0, name: '', email: '', password: '' }); // Limpia los campos después de crear
      } catch (err: any) {
        setError('Error al crear el usuario');
      }
    }
  };

  const handleDelete = async (usuario: User) => {
    try {
      await deleteUser(usuario.id);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== usuario.id));
    } catch (err: any) {
      setError('Error al eliminar el usuario');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Nombre', accessor: 'name' },
    { label: 'Correo Electrónico', accessor: 'email' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Mantenimiento de Usuarios</h1>

      {/* Botón para abrir el modal de creación de usuario */}
      <button
        onClick={openModalForNewUser}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nuevo Usuario
      </button>

      {/* Mostrar errores */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar tabla si no está cargando */}
      {!loading ? (
        <UniversalTable
          columns={columns}
          data={usuarios}
          onEdit={openModalForEditUser} // Al editar, abre el modal con la info del usuario
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando usuarios...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el correo electrónico"
          />
        </div>
        {!isEditing && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={newUser.password || ''}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-lg text-black"
              placeholder="Ingresa la contraseña"
            />
          </div>
        )}
        <button
          onClick={handleSaveUser}
          className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
        >
          {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
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

export default MantenimientoUsuarios;
