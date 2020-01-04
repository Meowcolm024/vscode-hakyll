// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const pages_url = vscode.workspace.getConfiguration().get('scode-hakyll.GitHubPagesURL');
const pages_branch = vscode.workspace.getConfiguration().get('vscode-hakyll.GitHubPagesBranch');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-hakyll" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let newPost = vscode.commands.registerCommand('vscode-hakyll.newPost', () => {
		let d = new Date();
		let date = String(d.getFullYear()) + '-' + String(d.getMonth()) + '-' + String(d.getDate());
		const options = {
			ignoreFocusOut: true,
			password: false,
			prompt: "Please type the title of your post"
		};
		vscode.window.showInputBox(options).then((value) => {
			if (value === undefined || value.trim() === '') {
				vscode.window.showInformationMessage('Please type the title of your post');
			} else {
				const title = value.trim();
				vscode.window.showInformationMessage('Creating post: \"' + title + '\" please wait.');
			}});
	});

	let generate = vscode.commands.registerCommand('vscode-hakyll.generateSite', () => {
		let terminal = vscode.window.createTerminal("Site");
		terminal.sendText('stack exec site build');
		terminal.show();
	});

	let server = vscode.commands.registerCommand('vscode-hakyll.previewServer', () => {
		let terminal = vscode.window.createTerminal("Server");
		terminal.sendText('stack exec site watch');
		terminal.show();
	})

	let deploy = vscode.commands.registerCommand('vscode-hakyll.deploy', () => {
		let d = new Date();
		let date = String(d.getFullYear()) + '-' + String(d.getMonth()) + '-' + String(d.getDate());
		let terminal = vscode.window.createTerminal("Deploy");
		terminal.sendText('cp -a _site/. _public/');
		terminal.sendText('cd _public');
		terminal.sendText('git add -A && git commit -m \"site updated: ' + date + '\"')
		terminal.sendText('git push');
		//terminal.show();
	})

	context.subscriptions.push(newPost);
	context.subscriptions.push(generate);
	context.subscriptions.push(server);
	context.subscriptions.push(deploy);
}

// this method is called when your extension is deactivated
export function deactivate() { }
