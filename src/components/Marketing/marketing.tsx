import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendEmail } from '@/services/emailService';
import { getUsers } from '@/services/userService';
import { updateEmail, deleteEmail, createEmail, getEmails } from '@/services/emailsServer'; // Asegúrate de tener estas funciones
interface User {
    id: number;
    email: string;
    name: string;
}

interface EmailFormProps {
    onSendSuccess: () => void; // Callback cuando el correo se envía con éxito
}

const EmailForm: React.FC<EmailFormProps> = ({ onSendSuccess }) => {
    const [subject, setSubject] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string>('marketing');
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Término de búsqueda
    const [selectAll, setSelectAll] = useState<boolean>(false); // Estado para "Seleccionar todos"
    const [sentEmails, setSentEmails] = useState<any[]>([]); // Estado para los correos enviados

    const templates: Record<string, string> = {
        marketing: `
      <p>¡Hola, {{name}}!</p>
      <p>Queremos informarte sobre nuestras ofertas exclusivas para ti.</p>
      <p>No te pierdas nuestras promociones especiales. Visítanos hoy mismo.</p>
      <p>¡Gracias por ser parte de nuestra comunidad!</p>
    `,
        payment: `
      <p>Estimado {{name}},</p>
      <p>Este es un recordatorio de que tu pago está pendiente. Por favor, realiza el pago lo antes posible.</p>
      <p>Detalles del pago:</p>
      <p>Asunto: Pago pendiente</p>
      <p>Gracias por tu atención.</p>
    `,
        info: `
      <p>Hola {{name}},</p>
      <p>Te estamos enviando este correo para mantenerte informado sobre las últimas actualizaciones.</p>
      <p>Visita nuestro sitio web para más detalles.</p>
      <p>¡Gracias por seguir con nosotros!</p>
    `,
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getUsers();
                setUsers(usersList);
            } catch (err) {
                console.error('Error obteniendo usuarios:', err);
                setError('No se pudieron cargar los usuarios.');
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setHtmlContent(templates[selectedTemplate]);
    }, [selectedTemplate]);

    // Cargar correos enviados desde la API
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const emails = await getEmails();
                setSentEmails(emails); // Establece los correos enviados en el estado
            } catch (err) {
                console.error('Error obteniendo correos:', err);
                setError('No se pudieron cargar los correos.');
            }
        };
        fetchEmails();
    }, []);

    const handleUserSelection = (user: User, isSelected: boolean) => {
        if (isSelected) {
            setSelectedUsers((prev) => [...prev, user]);
        } else {
            setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
        }
    };

    const handleSelectAll = (isSelected: boolean) => {
        setSelectAll(isSelected);
        if (isSelected) {
            setSelectedUsers(users);
        } else {
            setSelectedUsers([]);
        }
    };

    const handleDeleteEmail = async (index: number) => {

        const emailToDelete = sentEmails[index];
        console.log("Este es el emailToDelete ", emailToDelete)
        try {
            await deleteEmail(emailToDelete.id);
            setSentEmails((prev) => prev.filter((_, i) => i !== index));
            toast.success('Correo eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el correo:', error);
            toast.error('Ocurrió un error al eliminar el correo');

        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUsers.length === 0) {
            toast.error('Por favor, selecciona al menos un usuario.');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            await Promise.all(
            selectedUsers.map(async (user) => {
                const emailContent = htmlContent.replace('{{name}}', user.name);

                const emailData = {
                    userName: user.name,
                    email: user.email,
                    subject,
                    type: selectedTemplate,
                    content: emailContent,
                    createdAt: scheduleDate ? new Date(scheduleDate).toISOString() : new Date().toISOString(),
                };
                const today = new Date().toISOString().split('T')[0];
                const emailDate = new Date(emailData.createdAt).toISOString().split('T')[0];
            console.log("comparaciom ", emailDate, today)    
            if (emailDate === today) {
                await sendEmail(subject, emailContent, user.email);
                await createEmail(emailData);
                setSentEmails((prev) => [...prev, emailData]);
                toast.success('Correos enviados exitosamente');
            } else {
                await createEmail(emailData);
                setSentEmails((prev) => [...prev, emailData]);
                toast.info('Se creo correctamente, se enviará la fecha correspondiente.');
            }
            })
            );
            
            onSendSuccess();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                toast.error(error.message);
            } else {
                toast.error('Ocurrió un error desconocido');
                setError('Ocurrió un error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto p-10 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                    Enviar Correos Personalizados
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Vista Previa y Edición</h2>
           
                    </div>

                    <div className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Asunto:
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="mt-1 p-3 w-full text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">
                                    Enviar Programado:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="scheduleDate"
                                    className="mt-1 p-3 w-full text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="currentDate" className="block text-sm font-medium text-gray-700">
                                    Fecha Actual:
                                </label>
                                <button
                                    type="button"
                                    id="currentDate"
                                    className="mt-1 p-2 bg-gray-300 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setScheduleDate(new Date().toISOString().slice(0, 16))}
                                >
                                    Actual
                                </button>
                            </div>


                            <div>
                                <label htmlFor="template" className="block text-sm font-medium text-gray-700">
                                    Seleccionar Plantilla:
                                </label>
                                <select
                                    id="template"
                                    className="mt-1 p-3 w-full text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                >
                                    <option value="marketing">Marketing</option>
                                    <option value="payment">Aviso de Pago</option>
                                    <option value="info">Información</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Filtrar usuarios por nombre o correo"
                                    className="mt-1 p-3 w-full text-sm border border-gray-300 rounded-md shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold">Selecciona Usuarios:</h3>
                                <div className="overflow-y-auto max-h-80">
                                    <table className="w-full mt-2 border text-sm">
                                        <thead>
                                            <tr>
                                                <th className="p-3 border">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectAll}
                                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                                    />
                                                </th>
                                                <th className="p-3 border">Nombre</th>
                                                <th className="p-3 border">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="p-3 border text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedUsers.some((u) => u.id === user.id)}
                                                            onChange={(e) => handleUserSelection(user, e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="p-3 border">{user.name}</td>
                                                    <td className="p-3 border">{user.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs">{error}</p>}

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:bg-gray-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Enviando...' : 'Enviar Correos'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Correos Enviados (sección a la derecha) */}
                    <div className="col-span-1 lg:col-span-1 mt-8 lg:mt-0 max-h-96 overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Correos Enviados:</h2>
                        <table className="w-full mt-2 border text-sm">
                            <thead>
                                <tr>
                                    <th className="p-3 border">Asunto</th>
                                    <th className="p-3 border">Destinatario</th>
                                    <th className="p-3 border">Fecha de Envío</th>
                                    <th className="p-3 border">Tipo</th>
                                    <th className="p-3 border">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sentEmails.map((email, index) => (
                                    <tr key={index}>
                                        <td className="p-3 border">{email.subject}</td>
                                        <td className="p-3 border">{email.email}</td>
                                        <td className="p-3 border">{new Date(email.createdAt).toLocaleString()}</td>
                                        <td className="p-3 border">{email.type}</td>
                                        <td className="p-3 border text-center">
                                            <button
                                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteEmail(index)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
}
export default EmailForm;
