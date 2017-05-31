const {app, BrowserWindow} = require('electron')

let win

function createWindow () {

    win = new BrowserWindow({width: 431, height: 605, resizable: true})

    win.loadURL('file://'+ __dirname +'/cientific.html')

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
