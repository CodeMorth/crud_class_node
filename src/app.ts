import http from "http";
import path from "path";
import fs from "fs";
import { dataBase } from "./config/dataBase";
import { PORT } from "./config/env.config";
import { userRouter } from "./routes/user.routes";
import { RequestWhitParams } from "./interface/RequestType";

const serveStaticFile = (res: any, filePath: any) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Archivo no encontrado");
      return;
    }

    const extname = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";

    if (extname === ".jpg" || extname === ".jpeg") {
      contentType = "image/jpeg";
    } else if (extname === ".png") {
      contentType = "image/png";
    } else if (extname === ".gif") {
      contentType = "image/gif";
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  // Comprobamos si la ruta empieza con '/uploads' para servir los archivos estáticos
  if (req.url && req.url.startsWith("/uploads/")) {
    // Usamos process.cwd() para acceder correctamente a la carpeta 'uploads' en la raíz del proyecto
    const filePath = path.join(process.cwd(), req.url); // Construir la ruta completa del archivo
    serveStaticFile(res, filePath);
  } else {
    // Redirigir el manejo de otras rutas al router de usuarios
    userRouter(req as RequestWhitParams, res);
  }
});

(async () => {
  try {
    await dataBase.sync();
    console.log("Database sincronizada");

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log("Error al iniciar el servidor", error);
  }
})();
