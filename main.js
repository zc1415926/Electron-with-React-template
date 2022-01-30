const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const windowStateKeeper = require('electron-window-state');

let mainWindow;

function createWindow () {
  
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
      });

  mainWindow = new BrowserWindow({
    //frame: false, 
    //resizable: false,

    //'alwaysOnTop': true,

    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height':mainWindowState.height,
     webPreferences: {
       contextIsolation: false,
       nodeIntegration: true
     }
  })

  isDev ? mainWindow.setAlwaysOnTop(true):""
  
  mainWindowState.manage(mainWindow);
  mainWindow.setMenu(null);
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`);
  mainWindow.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})