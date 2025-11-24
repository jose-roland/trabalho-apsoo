import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import {
  registerMovieHandlers,
  registerAuditoriumHandlers,
} from "./infrastructure/ipc/index.js";
import { initializeDatabase } from "./infrastructure/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

async function createWindow() {
  await initializeDatabase();

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "./preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
  registerMovieHandlers();
  registerAuditoriumHandlers();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
