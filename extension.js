import { minify } from 'terser';
import { writeFileSync, existsSync } from 'fs';
import * as vscode from 'vscode';
// -----------------------------
import { minifyJavascript } from './src/functions/minify-javascript.js';



export const activate = (context) => {
    vscode.workspace.onDidSaveTextDocument((document) => {
  		const filePath = document.uri.fsPath.replace(/\.js$/, '.min.js');
			if (!existsSync(filePath)) return;
			
			// Esto funciona unicamente para js. (Actualmente jeje)
			vscode.commands.executeCommand('quickmin.quickmin');
    });

    // REGISTRO DE COMANDOS
    registerCommand(context, 'quickmin', () => minifyJavascript({ vscode, minify, writeFileSync }));
};

export const deactivate = () => {}

// Funcion para registrar comandos  y su funcionamiento
const registerCommand = (context, command, callback) => {
	const disposable = vscode.commands.registerCommand(`quickmin.${command}`, callback);
	context.subscriptions.push(disposable);
}