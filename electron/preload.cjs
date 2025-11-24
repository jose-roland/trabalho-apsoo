const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("movieApi", {
  getMovies: () => ipcRenderer.invoke("movies:getAll"),
  create: (movie) => ipcRenderer.invoke("movies:create", movie),
  update: (id, movie) => ipcRenderer.invoke("movies:update", { id, movie }),
  remove: (id) => ipcRenderer.invoke("movies:delete", id),
  getById: (id) => ipcRenderer.invoke("movies:getById", id),
});

contextBridge.exposeInMainWorld("auditoriumApi", {
  getAll: () => ipcRenderer.invoke("auditorium:getAll"),
  getById: (id) => ipcRenderer.invoke("auditorium:getById", id),
  create: (auditorium) => ipcRenderer.invoke("auditorium:create", auditorium),
  update: (id, auditorium) =>
    ipcRenderer.invoke("auditorium:update", { id, auditorium }),
  remove: (id) => ipcRenderer.invoke("auditorium:delete", id),
});
