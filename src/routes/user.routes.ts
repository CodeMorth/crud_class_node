import { ServerResponse } from "http";
import { RequestWhitParams } from "../interface/RequestType";
import {
  createUserC,
  deleteUserC,
  getAllUsersC,
  getUserByIdC,
  updateUserC,
} from "../controllers/user.controller";
import { multerMiddleware } from "../middlewares/multer.middleware";

export const userRouter = (
  req: RequestWhitParams,
  res: ServerResponse
): void => {
  if (req.url?.startsWith("/users") && req.method === "GET") {

    getAllUsersC(req, res);

  } else if (req.url?.startsWith("/user/") && req.method === "GET") {

    const id = req.url.split("/")[2];
    req.params = { id };
    getUserByIdC(req, res);

  } else if (req.url?.startsWith("/user") && req.method === "POST") {

    multerMiddleware(req, res, () => {
      createUserC(req, res);
    });

  } else if (req.url?.startsWith("/user") && req.method === "PUT") {

    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", (data: Buffer) => (body += data));
    req.on("end", () => {
      req.body = JSON.parse(body);
      req.params = { id };
      updateUserC(req, res);
    });

  } else if (req.url?.startsWith("/user/") && req.method === "DELETE") {

    const id = req.url.split("/")[2];
    req.params = { id };
    deleteUserC(req, res);

  }

};
