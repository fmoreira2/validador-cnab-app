const { app, BrowserWindow, Menu } = require("electron");
const electronReload = require("electron-reload");
electronReload(__dirname);
const path = require("path");

const isDev = process.env.NODE_ENV !== "development";
const isMac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

//create sobre window
function createSobreWindow() {
  const sobreWindow = new BrowserWindow({
    title: "Sobre",
    width: 500,
    height: 500,
  });

  sobreWindow.loadFile(path.join(__dirname, "./view/sobre.html"));
}

//create relatório window
function createRelatorioWindow() {
  const relatorioWindow = new BrowserWindow({
    title: "Relatório",
    width: 800,
    height: 720,
  });

  relatorioWindow.loadFile(
    path.join(__dirname, "./view/relatorio/relatorio.html")
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
    // label: "Arquivo",
    // submenu: [
    //   {
    //     label: "Validar Arquivo",
    //     click: () => app.quit(),
    //     accelerator: "CmdOrCtrl+A",
    //   },
    //   {
    //     label: "Sair",
    //     click: () => app.quit(),
    //     accelerator: "CmdOrCtrl+W",
    //   },
    // ],
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  //menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
