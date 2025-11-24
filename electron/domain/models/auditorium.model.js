import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../../infrastructure/index.js";

const sequelize = getSequelize();

class Auditorium extends Model {}

Auditorium.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [1],
          msg: "O número da sala deve ser maior que zero",
        },
      },
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "A sala deve possuir ao menos 1 assento",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("available", "unavailable"),
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: {
          args: [["available", "unavailable"]],
          msg: "Status inválido",
        },
      },
    },
    type: {
      type: DataTypes.ENUM("2d", "3d"),
      allowNull: false,
      defaultValue: "2d",
      validate: {
        isIn: {
          args: [["2d", "3d"]],
          msg: "Tipo de sala inválido",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Auditorium",
    tableName: "auditoriums",
    timestamps: true,
    underscored: false,
  }
);

export default Auditorium;
