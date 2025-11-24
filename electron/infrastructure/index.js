import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "./database/quadroaquadro.sqlite");

let sequelize = null;

export function getSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: databasePath,
      logging: false,
    });
  }
  return sequelize;
}

export async function initializeDatabase() {
  try {
    const db = getSequelize();

    await db.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida!");

    const { default: Movie } = await import("../domain/models/movie.model.js");

    const { default: Auditorium } = await import(
      "../domain/models/auditorium.model.js"
    );

    await db.sync({ alter: true });
    console.log(`✅ Banco de dados inicializado em: ${databasePath}`);
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
  }
}
