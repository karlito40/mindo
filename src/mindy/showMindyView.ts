import * as vscode from "vscode";
import * as path from "path";
import { getNonce } from "../utils";
import { deleteMindyView, hasMindyView, saveMindyView } from "./__manager";
import { drawMindmap } from "./drawMindmap";

export function showMindyView(
  context: vscode.ExtensionContext,
  editor: vscode.TextEditor
) {
  // nothing to do. The view is already create
  if (hasMindyView(editor)) {
    return;
  }

  const panel = createPanelView(context, editor);
  saveMindyView(editor, panel);

  const textToParse = findTextToParse(editor);
  drawMindmap(editor, textToParse || "");

  panel.onDidDispose(() => {
    console.log("webview closed", panel);
    // TODO: it may be an error to do that as we can't reopen
    // the view now
    deleteMindyView(editor);
  });
}

// prettier-ignore
function createPanelView(context: vscode.ExtensionContext, editor: vscode.TextEditor) {
  const panel = vscode.window.createWebviewPanel(
    "mindy.webview",
    `Mindy ${editor.document.fileName}`,
    {
      viewColumn: vscode.ViewColumn.Two,
      preserveFocus: true,
    },
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, "src", "shared")),
        vscode.Uri.file(path.join(context.extensionPath, "src", "webview")),
        vscode.Uri.file(path.join(context.extensionPath, "media")),
      ],
    }
  );

  panel.webview.html = createWebviewContent(
    context.extensionUri,
    panel.webview,
  );

  return panel;
}

// prettier-ignore
function createWebviewContent(extensionUri: vscode.Uri, webview: vscode.Webview) {
  const styles = [
    // prettier-ignore
    webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "src", "webview", "reset.css")),
    // prettier-ignore
    webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "src", "webview", "app.css")),
  ];

  const nonce = getNonce();
  const scripts = [
    webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "src", "webview", "webview.js")
    ),
  ];

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">

        <meta 
          http-equiv="Content-Security-Policy" 
          content="default-src 'none'; 
          style-src 'unsafe-inline' ${webview.cspSource}; 
          img-src ${webview.cspSource} https:;
          script-src 'nonce-${nonce}';"
        >
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        ${styles
          .map((uri) => `<link href="${uri}" rel="stylesheet">`)
          .join(" ")}
        
        <title>Mindy</title>
      </head>
      <body>
        <div id="map"></div>
        
        ${scripts
          .map(
            (uri) =>
              `<script nonce="${nonce}" type="module" src="${uri}"></script>`
          )
          .join(" ")}
      </body>
    </html>`;
}

function findTextToParse(editor?: vscode.TextEditor) {
  return editor?.document.getText();
}
