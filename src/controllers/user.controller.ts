import { ServerResponse } from "http";
import {
  createUserS,
  deleteUserS,
  getAllUsersS,
  getUserByIdS,
  updateUserS,
} from "../services/user.service";
import { RequestWhitParams } from "../interface/RequestType";

export const getAllUsersC = async (
  req: RequestWhitParams,
  res: ServerResponse
) => {
  try {
    await getAllUsersS(res);
  } catch (error) {}
};

export const getUserByIdC = async (
  req: RequestWhitParams,
  res: ServerResponse
) => {
  try {
    await getUserByIdS(req.params.id, res);
  } catch (error) {}
};

export const createUserC = async (
  req: RequestWhitParams,
  res: ServerResponse
) => {
  try {
    if (!req.body) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Faltan datos" }));
      return;
    }

    await createUserS(req.body, res);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Error al crear el usuario en los controladores",
      })
    );
  }
};

export const updateUserC = async (
  req: RequestWhitParams,
  res: ServerResponse
) => {
  try {
    await updateUserS(req.params.id, req.body, res);
  } catch (error) {}
};

export const deleteUserC = async (
  req: RequestWhitParams,
  res: ServerResponse
) => {
  try {
    await deleteUserS(req.params.id, res);
  } catch (error) {}
};
