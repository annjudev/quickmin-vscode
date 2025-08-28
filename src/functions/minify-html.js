import { minify } from "html-minifier-terser"

export const minifyHtml = async ({ vscode, writeFileSync }) => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	const minified = await minify(editor.document.getText(), {
		collapseWhitespace: true,
		removeComments: true,
    removeAttributeQuotes: true,
	});

  const originalPath = editor.document.uri.fsPath;
  const modifiedPath = originalPath.replace(/\.html$/, `.min.html`);

	writeFileSync(modifiedPath, minified, "utf8");
  vscode.window.showInformationMessage(`Archivo minificado correctamente.`);
}