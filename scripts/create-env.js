const fs = require('fs'); // require del file system. 
// Vamos a trabajar con un modulo de node que permite trabajar con el sistema operativo
// Puedo guardar o enviar datos en archivos que puedo escribir.

fs.writeFileSync('./.env',`API=${process.env.API}\n`);
// Con esto escribo el archivo .env en el servidor.
// Ahora vamos a asignar en netlify el contenido de API para que lo fabrique.