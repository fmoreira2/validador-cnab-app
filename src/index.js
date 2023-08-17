const { app, BrowserWindow, Menu, contextBridge, ipcMain } = require("electron");
const electronReload = require("electron-reload");
electronReload(__dirname);
const path = require("path");


const isDev = process.env.NODE_ENV !== "development";
const isMac = process.platform === "darwin";

//janelas
var mainWindow = null;
var RelWindow = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}



const createWindow = async () => {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),

    },
  });
  
  await mainWindow.loadFile(path.join(__dirname, "index.html"));

  

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

async function createRelWindow() {
  RelWindow = new BrowserWindow({
    parent: mainWindow,
    modal: false,
    width: 950,
    height: 750,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  await RelWindow.loadFile(path.join(__dirname, "relatorio/relatorio.html"));
  // Open the DevTools.
  if (isDev) {
    RelWindow.webContents.openDevTools();
  }
}

//ipcMain abrir modal
ipcMain.on("relModal", () => {
  createRelWindow();
});


//create sobre window
function createSobreWindow() {
  if (BrowserWindow.getAllWindows().length <= 1) {
    const sobreWindow = new BrowserWindow({
      title: "Sobre",
      width: 500,
      height: 500,
    });

    sobreWindow.loadFile(path.join(__dirname, "sobre.html"));
  }
}

app.on("ready", createWindow);

//menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "Sobre",
              click: createSobreWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
    label: "Arquivo",
    submenu: [
      {
        label: "Validar Arquivo",
        click: () => createNewFile(),
        accelerator: "CmdOrCtrl+A",
      },
      {
        label: "Sair",
        click: () => app.quit(),
        accelerator: "CmdOrCtrl+W",
      },
    ],
  },
  ...(!isMac
    ? [
        {
          label: "Ajuda",
          submenu: [
            {
              label: "Sobre",
              click: createSobreWindow,
            },
          ],
        },
      ]
    : []),
];

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  //menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});









