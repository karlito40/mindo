import * as vscode from "vscode";
import * as path from "path";
import { getNonce } from "../utils";
import { deleteMindoView, hasMindoView, saveMindoView } from "./__manager";
import { drawMindmap } from "./drawMindmap";

export function showMindoView(
  context: vscode.ExtensionContext,
  editor: vscode.TextEditor
) {
  // nothing to do. The view is already create
  if (hasMindoView(editor)) {
    return;
  }

  const panel = createPanelView(context, editor);
  saveMindoView(editor, panel);

  const textToParse = findTextToParse(editor);
  drawMindmap(editor, textToParse || "");

  panel.onDidDispose(() => {
    deleteMindoView(editor);
  });
}

// prettier-ignore
function createPanelView(context: vscode.ExtensionContext, editor: vscode.TextEditor) {
  const fileName = getFilenameFromPath(editor.document.fileName);

  const targetedColumn = editor.viewColumn ? editor.viewColumn + 1 : vscode.ViewColumn.Two;
  const panel = vscode.window.createWebviewPanel(
    "mindo.webview",
    `Mindo (${fileName})`,
    {
      viewColumn: targetedColumn,
      preserveFocus: true,
    },
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, "webview")),
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
    webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "webview", "reset.css")),
    // prettier-ignore
    webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "webview", "app.css")),
  ];

  
  const nonce = getNonce();
  const scripts = [
    webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, "webview", "webview.js")
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
          img-src ${webview.cspSource} https: data:;
          script-src 'nonce-${nonce}';"
        >
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        ${styles
          .map((uri) => `<link href="${uri}" rel="stylesheet">`)
          .join(" ")}
        
        <title>Mindo</title>
      </head>
      <body>
        <div id="map"></div>
        <div class="mind-elixir-toolbar lb export-toolbar">
          <button class="export-btn" data-export-type="svg">
            SVG
          </button>  
          <button class="export-btn" data-export-type="png">
            PNG
          </button>  
        </div>
        
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

function getFilenameFromPath(path: string) {
  const splits = path.split("/");
  return splits[splits.length - 1];
}
