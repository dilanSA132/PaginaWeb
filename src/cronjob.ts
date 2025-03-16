import * as cron from 'node-cron';

// Programar una tarea que se ejecutará cada minuto
cron.schedule('* * * * *', () => {
  console.log('Este cronjob se ejecuta cada minuto');
  // Aquí puedes colocar la lógica que desees ejecutar periódicamente
});

// Si necesitas ejecutar alguna tarea más compleja, puedes importar servicios, modelos, etc.
