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

	window.loadURL('https://messages.android.com/');

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
