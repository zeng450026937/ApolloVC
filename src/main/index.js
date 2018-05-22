

import { app, screen, BrowserWindow } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  log.transports.file = null;
}
else {
  log.transports.file.file = path.join(__static, 'log.txt');
  log.transports.file.level = 'info';
}

log.transports.console = null;
log.transports.rendererConsole = null;
log.transports.logS = null;

log.info('App starting...');

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const window = new BrowserWindow({
    width           : 360,
    minWidth        : 360,
    height          : 640,
    minHeight       : 640,
    show            : true,
    frame           : false,
    resizable       : false,
    backgroundColor : '#03A9F4',
    webPreferences  : {
      nativeWindowOpen : true
    }
  });
  
  if (isDevelopment) {
    // window.webContents.openDevTools();
  }
  
  if (isDevelopment) {
    window.loadURL(`https://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  }
  else {
    window.loadURL(formatUrl({
      pathname : path.join(__dirname, 'index.html'),
      protocol : 'file',
      slashes  : true
    }));
  }

  window.once('ready-to-show', () => {
    window.show();
  });

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown') {
      switch (input.key) {
        case 'F12':
          window.webContents.toggleDevTools();
          break;
      }
    }
  });

  window.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'modal') {
      // open window as modal
      event.preventDefault();
      Object.assign(options, {
        modal  : true,
        parent : mainWindow,
        width  : 100,
        height : 100
      });
      event.newGuest = new BrowserWindow(options);
    }
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault();
  callback(list[0]);
});

// init auto updater

autoUpdater.logger = log;

app.on('ready', () => {
  if (!isDevelopment) {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  log.info('Update available.', info);
});
autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.', info);
});
autoUpdater.on('error', (err) => {
  log.info(`Error in auto-updater. ${ err}`);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = `Download speed: ${progressObj.bytesPerSecond}`;

  log_message = `${log_message } - Downloaded ${ progressObj.percent }%`;
  log_message = `${log_message } (${ progressObj.transferred }/${ progressObj.total })`;
  log.info(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded', info);
});