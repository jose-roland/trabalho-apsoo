import { DataTypes, Model } from "sequelize";
import { getSequelize } from "../../infrastructure/index.js";

const sequelize = getSequelize();

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O título não pode ser vazio",
        },
        len: {
          args: [1, 255],
          msg: "O título deve ter entre 1 e 255 caracteres",
        },
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "A duração deve ser maior que 0",
        },
        max: {
          args: [600],
          msg: "A duração não pode exceder 600 minutos (10 horas)",
        },
      },
      comment: "Duração do filme em minutos",
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("available", "unavailable", "soon"),
      allowNull: false,
      defaultValue: "unavailable",
      validate: {
        isIn: {
          args: [["available", "unavailable", "soon"]],
          msg: "Status inválido",
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Desconhecido",
      validate: {
        notEmpty: {
          msg: "O gênero não pode ser vazio",
        },
      },
    },
    certification: {
      type: DataTypes.ENUM("everyone", "teen", "mature", "adult"),
      allowNull: false,
      defaultValue: "everyone",
      validate: {
        isIn: {
          args: [["everyone", "teen", "mature", "adult"]],
          msg: "Classificação indicativa inválida",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    underscored: false,
  }
);

export default Movie;
