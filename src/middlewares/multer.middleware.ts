import fs from "fs";
import path from "path";
import multer from "multer";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req: any, file: any, cb: any) => {
    const typeFile = path.extname(file.originalname);
    const filename = `${Date.now()}${typeFile}`;
    cb(null, filename);
  },
});

export const multerMiddleware = (req: any, res: any, next: any) => {
  const upload = multer({ storage }).single("avatar");

  upload(req, res, (err: any) => {
    if (err) {
      // Si hay algún error durante la subida...
      res.writeHead(400, { "Content-Type": "application/json" }); // Se envía una respuesta HTTP con código de estado 400 (Bad Request) y tipo de contenido JSON.
      res.end(
        JSON.stringify({
          message: "Error al subir el archivo - Multer",
          error: err,
        }) // Se envía un mensaje de error en formato JSON.
      );
      return; // Sale del middleware si hay un error.
    }

    if (req.file) {
      req.body.file = req.file;
    }
    next();
  });
};
