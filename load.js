const {Tray, app, BrowserWindow} = require('electron')

let win

function createWindow () {

    win = new BrowserWindow({width: 360, height: 680, resizable: false, icon:__dirname+'/src/media/icon.png'})

    win.loadURL('file://'+ __dirname +'/web/calculator_screen.html')

    win.webContents.openDevTools()

    win.on('closed', () => {

        win = null
    })
}

app.on('ready', createWindow)

app.on('activate', () => {
    if (win === null) {
        createWindow()
        }
    })
