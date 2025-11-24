import { ipcMain } from "electron";
import { createMovieHandler } from "../../application/handlers/movie/create-movie.handler.js";
import { getMoviesHandler } from "../../application/handlers/movie/get-movies.handler.js";
import { updateMovieHandler } from "../../application/handlers/movie/update-movie.handler.js";
import { deleteMovieHandler } from "../../application/handlers/movie/delete-movie.handler.js";
import { getMovieByIdHandler } from "../../application/handlers/movie/get-movie-by-id.handler.js";
import { createAuditoriumHandler } from "../../application/handlers/auditorium/create-auditorium.handler.js";
import { updateAuditoriumHandler } from "../../application/handlers/auditorium/update-auditorium.handler.js";
import { getAuditoriumsHandler } from "../../application/handlers/auditorium/get-auditoriums.handler.js";
import { getAuditoriumByIdHandler } from "../../application/handlers/auditorium/get-auditorium-by-id.handler.js";
import { deleteAuditoriumHandler } from "../../application/handlers/auditorium/delete-auditorium.handler.js";

export function registerMovieHandlers() {
  ipcMain.handle("movies:create", createMovieHandler);
  ipcMain.handle("movies:getAll", getMoviesHandler);
  ipcMain.handle("movies:update", updateMovieHandler);
  ipcMain.handle("movies:delete", deleteMovieHandler);
  ipcMain.handle("movies:getById", getMovieByIdHandler);
}

export function registerAuditoriumHandlers() {
  ipcMain.handle("auditorium:create", createAuditoriumHandler);
  ipcMain.handle("auditorium:update", updateAuditoriumHandler);
  ipcMain.handle("auditorium:getAll", getAuditoriumsHandler);
  ipcMain.handle("auditorium:getById", getAuditoriumByIdHandler);
  ipcMain.handle("auditorium:delete", deleteAuditoriumHandler);
}
