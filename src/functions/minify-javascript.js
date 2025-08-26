export const minifyJavascript = async ({ vscode, minify, writeFileSync }) => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return vscode.window.showErrorMessage('No hay un archivo abierto');

  const filePath = editor.document.uri.fsPath;
  const extensionFile = filePath.split('.').pop();

  if (!extensionFile.includes('js')) return vscode.window.showErrorMessage('El archivo debe tener la extensión .js');

  const documentCode = editor.document.getText();
  const firstLine = documentCode.split('\n')[0];
  const isDropConsole = !firstLine.includes('quickmin-ignore');

  const configMinify = {
      compress: {
          passes: 3,
          drop_console: isDropConsole,
          drop_debugger: true,
          dead_code: true,
      },
      mangle: {
        toplevel: true,
      },
      toplevel: true,
      format: {
          comments: false,
      }
  };

  const { code: minifiedCode } = await minify(documentCode, configMinify);

  const originalPath = editor.document.uri.fsPath;
  const minifiedFile = originalPath.replace(/\.js$/, ".min.js");

  writeFileSync(minifiedFile, minifiedCode, "utf8");
  vscode.window.showInformationMessage(`Archivo minificado correctamente.`);
};