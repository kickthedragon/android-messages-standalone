'use strict';

import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

console.debug = function(...args) {
	console.log(...args);
};

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

let pluginName;

//app.commandLine.appendSwitch('--enable-sandbox');

function createMainWindow() {
	const window = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		position: 'center',
		showDevTools: false,
		resizable: true,
		// fullscreen: true,
		titleBarStyle: 'hiddenInset'
	});

	if (isDevelopment) {
		window.webContents.openDevTools();
	}

	// if (isDevelopment) {
	// 	window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
	// } else {
	// 	window.loadURL(
	// 		formatUrl({
	// 			pathname: path.join(__dirname, 'index.html'),
	// 			protocol: 'file',
	// 			slashes: true
	// 		})
	// 	);
	// }

	window.loadURL('https://messages.android.com/');

	// window.onload = function() {
	// 	let webview = document.createElement('webview');
	// 	document.body.appendChild(webview);
	// 	webview.setAttribute('plugins', 'on');
	// 	webview.src = 'http://www.adobe.com/software/flash/about/';
	// };

	window.on('closed', () => {
		mainWindow = null;
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
	// if (process.platform !== 'darwin') {
	// 	app.quit();
	// }
});

app.on('activate', () => {
	// on macOS it is common to re-create a window even after all windows have been closed
	if (mainWindow === null) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
