import cron from 'node-cron';
import { sendEmail } from '../services/emailService';  // Importa tu servicio de envío de correos
import { getSales } from '@/services/saleService';

// Función para calcular la diferencia en días entre dos fechas
const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Cron job para enviar correos cada día a las 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Cron job iniciado: enviando correos de recordatorio de pago.');

  try {
    // Aquí colocas tu lógica para obtener los datos, como el listado de usuarios con pagos pendientes
    const users = await getSales(); // Esto puede ser una consulta a tu base de datos

    if (users.length === 0) {
      console.log('No hay usuarios con pagos pendientes.');
    }

    for (const user of users) {
      if (user.credit && user.credit.amountPaid === 0) {
        const today = new Date();
        const dueDate = new Date(user.credit.dueDate);
        const daysBeforeDue = 3; // Número de días antes de la fecha de vencimiento para enviar el recordatorio

        console.log(`Verificando usuario: ${user.name} con crédito pendiente.`);

        if (getDaysDifference(today, dueDate) <= daysBeforeDue) {
          const subject = 'Recordatorio de pago pendiente';
          const html = `
            <p>Estimado/a ${user.name},</p>
            <p>Le recordamos que tiene un pago pendiente de ${user.credit.pendingAmount}.</p>
            <p>Por favor, realice el pago antes del ${dueDate.toLocaleDateString()}.</p>
          `;

          await sendEmail(subject, html, user.email);
          console.log(`Correo enviado a ${user.email}`);
        } else {
          console.log(`El pago de ${user.name} no está dentro del rango de recordatorio.`);
        }
      }
    }
  } catch (error) {
    console.error('Error al enviar correos:', error);
  }
});
