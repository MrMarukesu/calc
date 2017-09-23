const {app, BrowserWindow} = require('electron')

let win

function createWindow () {

    win = new BrowserWindow({width: 585, height: 455, resizable: false, icon:__dirname+'/src/media/icon.png'})
    win.on('closed', function () {
      win = null
    })

    win.loadURL('file://'+ __dirname +'/web/calculator_screen.html')
    win.setMenu(null);
    win.show()
    //win.webContents.openDevTools() Only for Development Purporses
}

app.on('ready', createWindow)

app.on('activate', () => {
    if (win === null) {
        createWindow()
        }
    })
