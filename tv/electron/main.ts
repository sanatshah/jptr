import { app, BrowserWindow, contextBridge, ipcMain, ipcRenderer } from 'electron'
import net from 'net';
import { api } from './bridge'

// This server listens on a Unix socket at /var/run/mysocket
var unixServer = net.createServer(function(client) {
  console.log("client connected!!")

  client.on('data', (data) => {
    console.log("got data: ", data.toString())
    ipcMain.emit('message', data.toString())
    mainWindow?.webContents.send('message', data.toString())
    mainWindow?.emit('message', data.toString())
  })

});

unixServer.listen('7771');

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow () {
  mainWindow = new BrowserWindow({
    //icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    autoHideMenuBar: true,
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log("test", message)
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
