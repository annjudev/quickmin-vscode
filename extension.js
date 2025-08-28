import { writeFileSync, existsSync } from 'fs';
import * as vscode from 'vscode';
import { availableLanguages } from './available-languages.js';

export const activate = (context) => {
    vscode.workspace.onDidSaveTextDocument((document) => {
			availableLanguages.forEach(({ name, ext }) => {
				const filePath = document.uri.fsPath.replace(new RegExp(`\\.${ext}$`), `.min.${ext}`);
				if (!existsSync(filePath)) return;

				document.languageId === name && vscode.commands.executeCommand('quickmin.quickmin');
			})
    });

    // REGISTRO DE COMANDOS
    registerCommand(context, 'quickmin', () => {
			availableLanguages.forEach(async ({ name, method, path }) => {
				if (vscode.window.activeTextEditor?.document.languageId === name) {
					const Minify = await import(`./src/functions/${path}.js`);
					Minify[method]({ vscode, writeFileSync });
				}
			});
		});
};

export const deactivate = () => {}

// Funcion para registrar comandos  y su funcionamiento
const registerCommand = (context, command, callback) => {
	const disposable = vscode.commands.registerCommand(`quickmin.${command}`, callback);
	context.subscriptions.push(disposable);
}