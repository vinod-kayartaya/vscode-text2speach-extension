const vscode = require('vscode');
const say = require('say');

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'vscode-text-to-speech.readSelected',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No editor is active');
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!text) {
        vscode.window.showInformationMessage('No text selected');
        return;
      }

      try {
        // Using the say package instead of Web Speech API
        say.speak(text, null, 1.0, (err) => {
          if (err) {
            vscode.window.showErrorMessage(
              'Failed to read text: ' + err.message
            );
            return;
          }
        });
        vscode.window.showInformationMessage('Reading selected text...');
      } catch (error) {
        vscode.window.showErrorMessage('Failed to read text: ' + error.message);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {
  // Stop any ongoing speech when the extension is deactivated
  say.stop();
}

module.exports = {
  activate,
  deactivate,
};
