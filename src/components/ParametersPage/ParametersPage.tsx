import React, { useState, useEffect } from 'react';
import UniversalTable from '../Table/UniversalTable';
import CustomModal from '../modal/CustomModal';
import {
  getParameters,
  deleteParameters,
  createParameters,
  updateParameters,
  Parameter,
} from '@/services/parametersService';

// Estado inicial para crear un parámetro (sin id y createdAt)
const initialParameterState: Omit<Parameter, 'id' | 'createdAt'> = {
  info: '',
  email: '',
  emailPassword: '',
  location: '',
  pageName: '',
  mission: '',
  vision: '',
  logo: '',
  phone: '', // Agregar el campo de teléfono
};

const Parameters: React.FC = () => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newParameter, setNewParameter] = useState<
    Omit<Parameter, 'id' | 'createdAt'>
  >(initialParameterState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchParameters = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = await getParameters();
        setParameters(params);
      } catch (err: any) {
        setError('Error al cargar los parámetros');
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  // Abre el modal para crear un nuevo parámetro
  const openModalForNewParameter = () => {
    setIsEditing(false);
    setNewParameter(initialParameterState);
    setModalIsOpen(true);
  };

  // Abre el modal para editar, extrayendo solo los campos editables
  const openModalForEditParameter = (parameter: Parameter) => {
    setIsEditing(true);
    setEditingId(parameter.id);
    const { id, createdAt, ...editableData } = parameter;
    setNewParameter(editableData);
    setModalIsOpen(true);
  };

  const handleSaveParameter = async () => {
    if (isEditing && editingId !== null) {
      try {
        const updatedParameter = await updateParameters(editingId, {
          id: editingId,
          createdAt: new Date().toISOString(), 
          ...newParameter,
        });
        setParameters((prev) =>
          prev.map((p) => (p.id === updatedParameter.id ? updatedParameter : p))
        );
        setModalIsOpen(false);
      } catch (err: any) {
        setError('Error al actualizar el parámetro');
      }
    } else {
      try {
        const createdParameter = await createParameters(newParameter);
        setParameters((prev) => [...prev, createdParameter]);
        setModalIsOpen(false);
      } catch (err: any) {
        setError('Error al crear el parámetro');
      }
    }
  };

  const handleDelete = async (parameter: Parameter) => {
    try {
      await deleteParameters(parameter.id);
      setParameters((prev) => prev.filter((p) => p.id !== parameter.id));
    } catch (err: any) {
      setError('Error al eliminar el parámetro');
    }
  };

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Info', accessor: 'info' },
    { label: 'Correo', accessor: 'email' },
    { label: 'Correo Contraseña', accessor: 'emailPassword' },
    { label: 'Ubicacion', accessor: 'location' },
    { label: 'Nombre de la Pagina', accessor: 'pageName' },
    { label: 'Misión', accessor: 'mission' },
    { label: 'Visión', accessor: 'vision' },
    { label: 'Logo', accessor: 'logo' },
    { label: 'Telefono', accessor: 'phone' },
    { label: 'Creado', accessor: 'createdAt' },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">
        Mantenimiento de Parámetros
      </h1>

      <button
        onClick={openModalForNewParameter}
        className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
      >
        Nuevo Parámetro
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {!loading ? (
        <UniversalTable
          columns={columns}
          data={parameters}
          onEdit={openModalForEditParameter}
          onDelete={handleDelete}
        />
      ) : (
        <p className="text-center text-gray-600">Cargando parámetros...</p>
      )}

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? 'Editar Parámetro' : 'Crear Nuevo Parámetro'}
        </h2>
        {/* Campo para "info" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="info">
            Información
          </label>
          <input
            type="text"
            id="info"
            value={newParameter.info || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, info: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la información"
          />
        </div>
        {/* Campo para "email" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={newParameter.email}
            onChange={(e) =>
              setNewParameter({ ...newParameter, email: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el email"
          />
        </div>
        {/* Campo para "emailPassword" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="emailPassword">
            Email Password
          </label>
          <input
            type="text"
            id="emailPassword"
            value={newParameter.emailPassword}
            onChange={(e) =>
              setNewParameter({
                ...newParameter,
                emailPassword: e.target.value,
              })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la contraseña del email"
          />
        </div>
        {/* Campo para "location" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Ubicación
          </label>
          <input
            type="text"
            id="location"
            value={newParameter.location || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, location: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la ubicación"
          />
        </div>
        {/* Campo para "pageName" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="pageName">
            Page Name
          </label>
          <input
            type="text"
            id="pageName"
            value={newParameter.pageName}
            onChange={(e) =>
              setNewParameter({ ...newParameter, pageName: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el nombre de la página"
          />
        </div>
        {/* Campo para "mission" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="mission">
            Misión
          </label>
          <input
            type="text"
            id="mission"
            value={newParameter.mission || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, mission: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la misión"
          />
        </div>
        {/* Campo para "vision" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="vision">
            Visión
          </label>
          <input
            type="text"
            id="vision"
            value={newParameter.vision || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, vision: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la visión"
          />
        </div>
        {/* Campo para "logo" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="logo">
            Logo
          </label>
          <input
            type="text"
            id="logo"
            value={newParameter.logo || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, logo: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa la URL del logo"
          />
        </div>
        {/* Campo para "phone" */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            value={newParameter.phone || ''}
            onChange={(e) =>
              setNewParameter({ ...newParameter, phone: e.target.value })
            }
            className="w-full p-4 border border-gray-300 rounded-lg text-black"
            placeholder="Ingresa el teléfono"
          />
        </div>
        <button
          onClick={handleSaveParameter}
          className="bg-teal-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-teal-600"
        >
          {isEditing ? 'Guardar cambios' : 'Crear parámetro'}
        </button>
      </CustomModal>
    </div>
  );
};

export default Parameters;
