import { DataTypes } from "sequelize";
import { dataBase } from "../config/dataBase";

export const User = dataBase.define("user", {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM,
    values: ["connected", "offline"],
    defaultValue: "offline",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
