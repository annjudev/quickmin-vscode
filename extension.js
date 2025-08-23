import { minify } from 'terser';
import { writeFileSync } from 'fs';
import * as vscode from 'vscode';

export const activate = (context) => {
	const editor = vscode.window.activeTextEditor;
	// Funcion para registrar comandos  y su funcionamiento
	const registerCommand = (command, callback) => {
		const disposable = vscode.commands.registerCommand(`quickmin.${command}`, callback);
		context.subscriptions.push(disposable);
	}

	// REGISTRO DE COMANDOS
   registerCommand('quickmin', async () => {
	if (!editor) return vscode.window.showErrorMessage('No hay un archivo abierto');
	
	const filePath = editor.document.uri.fsPath;
	const extensionFile = filePath.split('.').pop();

	if(!extensionFile.includes('js')) return vscode.window.showErrorMessage('El archivo debe tener la extensión .js');
	
	const documentCode = editor.document.getText();
	const configMinify = {
		compress: {
			passes: 3,           // Varios pases de optimización
			drop_console: true,  // Elimina console.log, console.error, etc.
			drop_debugger: true, // Elimina "debugger"
			dead_code: true,     // Borra código inalcanzable
		},
		mangle: {
			toplevel: true,      // Renombra variables y funciones de nivel superior
		},
		toplevel: true,        // Permite optimizar variables globales
		format: {
			comments: false,     // Quita comentarios
		}
	};
	const result = await minify(documentCode, configMinify);

	const originalPath = editor.document.uri.fsPath;
	const newPath = originalPath.replace(/\.js$/, ".min.js");

	writeFileSync(newPath, result.code, "utf8");
	 vscode.window.showInformationMessage(`Archivo minificado correctamente.`);

});
}

export const deactivate = () => {}