import { DataSource } from "typeorm";
import { Movie } from "../../domain/entities/movie.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  entities: [Movie], // coloque todas as entidades aqui
});
