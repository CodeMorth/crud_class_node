import { ServerResponse } from "http";
import { User } from "../models/user.models";

export const getAllUsersS = async (res: ServerResponse): Promise<void> => {
  try {
    const users = await User.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error al obtener los usuarios" }));
  }
};

export const getUserByIdS = async (
  id: string,
  res: ServerResponse
): Promise<void> => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Usuario no encontrado" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error al obtener los usuarios" }));
  }
};

export const createUserS = async (
  data: any,
  res: ServerResponse
): Promise<void> => {
  try {
    const avatarUrl = data.file ? `uploads/${data.file.filename}` : null;

    const newUser = await User.create({ ...data, avatar: avatarUrl });

    if(!newUser){
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Error al crear el usuario" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Usuario creado con exito" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error al crear el usuario" }));
  }
};

export const updateUserS = async (
  id: string,
  data: any,
  res: ServerResponse
): Promise<void> => {
  try {
    const userById = await User.findByPk(id);

    await userById.update(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Usuario modificado con exito" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error al modificar el usuario" }));
  }
};

export const deleteUserS = async (
  id: string,
  res: ServerResponse
): Promise<void> => {
  try {
    const user = await User.findByPk(id);
    await user.destroy();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Usuario eliminado con exito" }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Error eliminar el usuario" }));
  }
};
