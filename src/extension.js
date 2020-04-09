// ┏━╸╻ ╻┏━╸╻ ╻┏━┓┏━┓ ┏━╸╻ ╻╺┳╸┏━╸┏┓╻┏━┓╻┏━┓┏┓╻
// ┣╸ ┃ ┃┃  ┣━┫┣━┫┣┳┛ ┣╸ ┏╋┛ ┃ ┣╸ ┃┗┫┗━┓┃┃ ┃┃┗┫
// ╹  ┗━┛┗━╸╹ ╹╹ ╹╹┗╸╹┗━╸╹ ╹ ╹ ┗━╸╹ ╹┗━┛╹┗━┛╹ ╹

// Copyright (c) 2020 Shane R. Spencer <spencersr@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// SPDX-License-Identifier: MIT

// Author: Shane R. Spencer <spencersr@gmail.com>

const vscode = require("vscode");

const render = require("./render");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "fuchar" is now active!');

  function fucharReplaceSelection(font) {
    const editor = vscode.window.activeTextEditor;

    const editorOperations = editor.selections.map((selection) => {
      let last = editor.document.lineAt(selection.end.line).range.end.character;

      selection = new vscode.Selection(
        selection.start.line,
        0,
        selection.end.line,
        last
      );

      let text = editor.document.getText(selection);

      text = render.render_string(font, text);

      return {
        text: text,
        selection: selection,
      };
    });

    editor.edit((builder) => {
      editorOperations.forEach(({ text, selection }) => {
        builder.delete(selection);
        builder.insert(selection.anchor, text);
      });
    });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("fuchar.replaceSelectionFuture", () =>
      fucharReplaceSelection("future")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("fuchar.replaceSelectionPagga", () =>
      fucharReplaceSelection("pagga")
    )
  );
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
