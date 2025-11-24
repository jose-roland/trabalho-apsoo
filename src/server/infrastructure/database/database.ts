import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Garante que exista uma pasta para o banco
const dbPath = path.join(__dirname, "cinema.db");

if (!fs.existsSync(dbPath)) {
  console.log("🧱 Criando novo banco de dados...");
}

const db = new Database(dbPath);

// Exemplo: criar tabelas se não existirem
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    duracao REAL,
    descricao TEXT,
    data_estreia TEXT
  );
`);

export default db;
